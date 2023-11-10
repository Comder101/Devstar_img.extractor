<script>
	import { onMount } from "svelte";

	let url = "";
	let imgUrls = [];
	let allImgUrls = [];
	let loading = false;
	let error = null;
	let filterBy = "";
	let sortOrder = 1;

	onMount(() => {
		scrape();
	});

	async function scrape() {
		loading = true;
		error = null;

		try {
			const response = await fetch("http://localhost:5000/api/scrape", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ url }),
			});

			const data = await response.json();
			if (data.success) {
				imgUrls = data.imgUrls;
				allImgUrls = data.imgUrls;
			} else {
				error = data.error;
			}
		} catch (error) {
			console.error("Error:", error);
			error = "An error occurred during the scraping process.";
		} finally {
			loading = false;
		}
	}

	async function getImageInfo(imageUrl) {
		try {
			// Fetch the image using a HEAD request to retrieve headers
			const response = await fetch(imageUrl, { method: "HEAD" });

			if (response.headers.has("content-length")) {
				// Get the content-length header to determine the size in bytes
				const contentLength = parseInt(
					response.headers.get("content-length")
				);
				const imageSize = formatBytes(contentLength);

				// Get the content-type (MIME type) header
				const contentType = response.headers.get("content-type");

				return { size: imageSize, type: contentType };
			} else {
				return { size: "Unknown", type: "Unknown" };
			}
		} catch (error) {
			console.error("Error fetching image:", error);
			return { size: "Unknown", type: "Unknown" };
		}
	}

	function formatBytes(bytes) {
		const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
		if (bytes === 0) return "0 Byte";
		const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
		return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i];
	}

	function filterImages(imageType) {
		if (imageType === "all") {
			imgUrls = allImgUrls;
		} else {
			imgUrls = allImgUrls.filter((imgUrl) =>
				imgUrl.toLowerCase().endsWith(`.${imageType}`)
			);
		}
		applyFilter();
	}

	function showResults() {
		var urlInput = document.getElementById("url").value;
		if (urlInput) {
			var resultsContainer = document.getElementById("resultsContainer");
			resultsContainer.style.display = "block";
		}
	}

	function downloadSelectedImages() {
		const selectedImages = document.querySelectorAll(
			".horizontal .image-frame-vertical .frame-2 img[data-selected='true']"
		);

		selectedImages.forEach((image) => {
			const imageSrc = image.src;
			const fileName = "image_" + Date.now();
			downloadImage(imageSrc, fileName);
		});
	}

	function downloadAll() {
		downloadSelectedImages();
	}

	function downloadImage(imageSrc, fileName) {
		fetch(imageSrc)
			.then((response) => response.blob())
			.then((blob) => {
				const url = window.URL.createObjectURL(blob);
				const a = document.createElement("a");
				a.href = url;
				a.download = fileName;
				document.body.appendChild(a);
				a.click();
				window.URL.revokeObjectURL(url);
				document.body.removeChild(a);
			})
			.catch((error) => {
				console.error("Error downloading image:", error);
			});
	}

	function selectAll() {
		const images = document.querySelectorAll(
			".horizontal .image-frame-vertical .frame-2 img"
		);
		images.forEach((image) => {
			image.setAttribute("data-selected", "true");
			image.style.border = "2px solid blue";
		});
	}

	function deselectAll() {
		const images = document.querySelectorAll(
			".horizontal .image-frame-vertical .frame-2 img"
		);
		images.forEach((image) => {
			image.setAttribute("data-selected", "false");
			image.style.border = "1px solid #ccc";
		});
	}

	function copyImageUrl() {
		const image = document.getElementById("imageToCopy");

		if (image && image.src) {
			const imageUrl = image.src;
			copyToClipboard(imageUrl);
			alert("Image URL copied to clipboard: " + imageUrl);
		}
	}

	function copyToClipboard(text) {
		const textarea = document.createElement("textarea");
		textarea.value = text;
		document.body.appendChild(textarea);
		textarea.select();
		document.execCommand("copy");
		document.body.removeChild(textarea);
	}

	function applyFilter() {
		if (filterBy === "imageSize") {
			// Filter images by size
			const maxSizeInBytes = 1024 * 1024; // Example: 1 MB
			imgUrls = imgUrls.filter((imgUrl) => {
				const headRequest = new Request(imgUrl, { method: "HEAD" });
				return fetch(headRequest)
					.then((response) => {
						if (response.headers.has("content-length")) {
							const contentLength = parseInt(
								response.headers.get("content-length")
							);
							return contentLength <= maxSizeInBytes;
						}
						return true;
					})
					.catch((error) => {
						console.error("Error fetching image:", error);
						return false;
					});
			});
			toggleSortOrder(); // Apply sorting after filtering
		} else if (filterBy === "all") {
			imgUrls = allImgUrls;
		} else if (filterBy === "imageWidth") {
			// Filter images by image width
			const minWidth = 200; // Example: Minimum width of 200 pixels
			imgUrls = imgUrls.filter((imgUrl) => {
				return new Promise((resolve) => {
					const img = new Image();
					img.src = imgUrl;
					img.onload = () => {
						const imageWidth = img.width;
						resolve(imageWidth >= minWidth);
					};
				});
			});
			toggleSortOrder(); // Apply sorting after filtering
		} else if (filterBy === "imageHeight") {
			// Filter images by image height
			const minHeight = 150; // Example: Minimum height of 150 pixels
			imgUrls = imgUrls.filter((imgUrl) => {
				return new Promise((resolve) => {
					const img = new Image();
					img.src = imgUrl;
					img.onload = () => {
						const imageHeight = img.height;
						resolve(imageHeight >= minHeight);
					};
				});
			});
			toggleSortOrder(); // Apply sorting after filtering
		} else if (filterBy === "imageName") {
			// Filter images by image name
			const targetName = "example.jpg"; // Example: Target image name
			imgUrls = imgUrls.filter((imgUrl) => {
				const imageName = imgUrl.substring(imgUrl.lastIndexOf("/") + 1);
				return imageName === targetName;
			});
			toggleSortOrder(); // Apply sorting after filtering
		} else if (filterBy === "imageType") {
			// Filter images by image type
			const targetType = "png"; // Example: Target image type
			imgUrls = imgUrls.filter((imgUrl) => {
				const imageType = imgUrl.split(".").pop();
				return imageType.toLowerCase() === targetType.toLowerCase();
			});
			toggleSortOrder(); // Apply sorting after filtering
		}
	}

	function toggleSortOrder() {
		sortOrder *= -1;
		imgUrls.sort((a, b) => sortOrder * a.localeCompare(b));
	}

	function sortByFormat(format) {
		// Filter images by the specified format (e.g., "png", "jpg", "ico")
		if (format === "all") {
			imgUrls = allImgUrls;
		} else {
			imgUrls = allImgUrls.filter((imgUrl) => {
				const imgFormat = imgUrl.split(".").pop().toLowerCase();
				return imgFormat === format;
			});
		}
	}
</script>

<link
	rel="stylesheet"
	href="https://use.fontawesome.com/releases/v5.5.0/css/all.css"
	integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU"
	crossorigin="anonymous"
/>
<link
	rel="stylesheet"
	href="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
/>

<nav class="navbar navbar-expand-md navbar-light bg-light">
	<img
		style="height:100px;width:100px"
		class="image"
		src="img/image.png"
		alt="1"
	/>

	<span style="color:black;margin-left:30px;" class="home-text"
		><span>Extract Image</span></span
	>
	<br /><br />

	<span
		class="home-text02"
		style="color:black;margin-top:80px;margin-left:10px;"
		><span>from any public website!</span></span
	>
	<div id="navb" class="navbar-collapse collapse hide">
		<ul class="navbar-nav" style="font-size:20px;">
			<li class="nav-item active">
				<a class="nav-link" href="/">Home</a>
			</li>
			<li class="nav-item">
				<a class="nav-link" href="#aboutus">About us</a>
			</li>
			<li class="nav-item">
				<a class="nav-link" href="#faq">Help Center</a>
			</li>
		</ul>

		<ul class="nav navbar-nav ml-auto">
			<li class="nav-item">
				<a class="nav-link" href="#"
					><span class="fas fa-user" /> Sign Up</a
				>
			</li>
			<li class="nav-item">
				<a class="nav-link" href="#"
					><span class="fas fa-sign-in-alt" /> Login</a
				>
			</li>
		</ul>
	</div>
</nav>

<div class="header">
	<div class="home-container">
		<div class="home-searchbar">
			<div
				class="home-urlbar"
				style="margin-left: 300px; margin-top:200px;"
			>
				<input
					style="color:white;font-size:20px;"
					class="home-text05"
					placeholder="Enter any URL"
					type="text"
					id="url"
					bind:value={url}
				/>
				<button
					on:click={scrape}
					disabled={loading}
					on:click={showResults}
					class="home-button"
					style="margin-left: 380px;"
				>
					{loading ? "Extracting..." : "Extract"}
				</button>
			</div>
		</div>
	</div>
</div>
<!-- </div> -->

<div class="res-load">
	<div class="div">
		<div class="main-res-frame">
			<div
				class="main-res-frame-2"
				id="resultsContainer"
				style="display: none;"
			>
				<div class="side-bar-sort">
					<div class="sort">
						<div class="sort-head">
							<div class="text-wrapper">
								<label for="sortOptions">Sort By:</label>
							</div>
							<button on:click={toggleSortOrder}>
								{sortOrder === 1 ? "Ascending" : "Descending"}
							</button>
						</div>
						<div class="sort-menu">
							<label for="filterBy">Filter By:</label>
							<select id="filterBy" bind:value={filterBy}>
								<option value="all">All</option>
								<option value="imageSize">Image Size</option>
								<option value="imageWidth">Image Width</option>
								<option value="imageHeight">Image Height</option
								>
								<option value="imageName">Image Name</option>
								<option value="imageType">Image Type</option>
							</select>

							<button on:click={applyFilter}>
								Apply Filter
							</button>
						</div>
					</div>
					<div class="filter">
						<div class="text-wrapper-3">Filter images by type</div>
						<div class="filter-menu">
							<div class="sorting-buttons">
								<button on:click={() => sortByFormat("all")}
									>All
								</button>
								<button on:click={() => sortByFormat("png")}
									>PNG</button
								>
								<button on:click={() => sortByFormat("jpg")}
									>JPG</button
								>
								<button on:click={() => sortByFormat("ico")}
									>ICO</button
								>
								<button on:click={() => sortByFormat("jpeg")}
									>JPEG</button
								>
								<button on:click={() => sortByFormat("svg")}
									>SVG</button
								>
								<button on:click={() => sortByFormat("webp")}
									>WEBP</button
								>
							</div>
						</div>
					</div>
					<div class="download-buttons">
						<div class="select-deselect">
							<div class="white-button">
								<img
									class="img"
									src="img/check-circle.jpg"
									alt="a"
								/>
								<div class="text-wrapper-11">
									<button on:click={selectAll}
										>Select All</button
									>
								</div>
							</div>
							<div class="white-button">
								<img
									class="img"
									src="img/radio-button-unchecked.jpg"
									alt="h"
								/>
								<div class="text-wrapper-11">
									<button on:click={deselectAll}
										>Deselect All</button
									>
								</div>
							</div>
							<div class="white-button">
								<div class="text-wrapper-11">
									<button
										style="color:green;"
										on:click={downloadAll}
										>Download Selected</button
									>
								</div>
							</div>
						</div>
					</div>
				</div>
				<br />
				<div class="res-frame">
					<div class="result-header">
						<p class="showing-images-from">
							<span class="span">Showing images from </span>
							<span class="text-wrapper-13">{url}</span>
						</p>
					</div>
					<div class="horizontal">
						{#if imgUrls.length > 0}
							{#each imgUrls as imgUrl, imgUrlIndex}
								<div
									class="image-frame-vertical"
									data-selected="false"
								>
									<div class="frame-2">
										<img
											class="rectangle"
											src={imgUrl}
											alt="image{imgUrlIndex + 1}"
											id="imageToCopy"
										/>
										<div class="text-wrapper-14">
											Image Name
										</div>
									</div>
									<div class="frame-3">
										<div class="file-size">
											{#await getImageInfo(imgUrl)}
												<p>Loading...</p>
											{:then imageInfo}
												<div class="text-wrapper-15">
													Size: {imageInfo.size}
												</div>
											{:catch error}
												<div class="text-wrapper-15">
													Error: {error}
												</div>
											{/await}
										</div>
										<div class="image-type">
											{#await getImageInfo(imgUrl)}
												<p>Loading...</p>
											{:then imageInfo}
												<div class="text-wrapper-4">
													Type: {imageInfo.type}
												</div>
											{:catch error}
												<div class="text-wrapper-4">
													Error: {error}
												</div>
											{/await}
										</div>
										<div class="frame-4">
											<button on:click={copyImageUrl}
												>Copy Image URL</button
											>
											<button
												on:click={() =>
													downloadImage(
														imgUrl,
														`image${
															imgUrlIndex + 1
														}.jpg`
													)}
											>
												Download
											</button>
										</div>
									</div>
								</div>
							{/each}
						{:else}
							<p>No images to display.</p>
						{/if}
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<br />
<br />
<br />
<section class="services">
	<h1>Why Choose Us?</h1>
	<br />
	<div class="row">
		<div class="services-col">
			<!-- svelte-ignore a11y-img-redundant-alt -->
			<img src="img/1_serv.png" alt="Service Image 1" />
			<h3>Efficiency</h3>

			<h5>
				Save time and effort with our automated image extraction
				process.
			</h5>
		</div>
		<div class="services-col">
			<!-- svelte-ignore a11y-img-redundant-alt -->
			<img src="img/2_serv.png" alt="Service Image 2" />
			<h3>User-Friendly</h3>

			<h5>
				Our intuitive interface makes the process accessible to all.
			</h5>
		</div>
		<div class="services-col">
			<!-- svelte-ignore a11y-img-redundant-alt -->
			<img src="img/3_serv.png" alt="Service Image 3" />
			<h3>Volunteer</h3>
			<h5>Tailor your image extraction settings to suit your needs.</h5>
		</div>
	</div>
</section>

<hr />

<section class="FAQ" id="faq">
	<h2>Frequently Asked Questions:</h2>
	<br />

	<div>
		<h3>Can I download multiple images at once?</h3>
		<p>
			Of course, you can select them by clicking the images and then use
			the "Download selected" button on the left to download all selected
			images in a ZIP file. This can take some time depending on how many
			images you selected. Note that there is a chance that some images
			cannot be downloaded and won't be included in the ZIP file.
		</p>
	</div>

	<div>
		<h3>Why might the extraction process not work?</h3>
		<p>
			There are several reasons why the extraction might fail. The website
			you entered might not be publicly accessible or it might be
			protected by a login. Very slow or large websites might also cause
			issues. Additionally, if there are a lot of people using our website
			at the same time, it can cause performance issues on our side. In
			this case, you should try again later or try a different website. We
			are continuously working on improving the performance of our
			service.
		</p>
	</div>
</section>

<section class="aboutus">
	<hr />
	<h3>About Us</h3>
	<h4>VisualHarbor: Your Gateway to Seamless Image Extraction !</h4>
</section>
<p>
	Welcome to VisualHarbor, where the art of visual storytelling meets
	efficiency. Our passion drives our mission – to transform the landscape of
	image gathering on the web for individuals, designers, content creators, and
	researchers alike. Behind VisualHarbor is a dedicated team of professionals
	committed to simplifying the process of image extraction. We recognize the
	potency of visuals in communication, creativity, and knowledge sharing.
	Therefore, our goal is clear: to empower you with tools that effortlessly
	streamline the collection and utilization of images. Our platform offers a
	user-friendly experience, allowing you to extract images seamlessly from web
	pages, URLs, and online documents. It's a one-stop solution for all your
	visual content needs, designed to enhance your efficiency and elevate your
	projects, research, or creative endeavors. At VisualHarbor, we understand
	the value of your time and energy. Our commitment is to help you save both,
	enabling you to focus on what truly matters – whether it's crafting
	exceptional projects, conducting groundbreaking research, or unleashing your
	creative genius. Embark on this visual journey with us, and together, let's
	paint the digital world with vibrant expressions, one extracted image at a
	time. VisualHarbor – where visuals meet simplicity and creativity knows no
	bounds.
</p>
<br />
<section class="footer" id="aboutus">
	<h3>Contact Us</h3>
	<p />
	<h4>
		<a href="mailto:dvstrimgextractor@gmail.com"
			>dvstrimgextractor@gmail.com</a
		>
		<a href="tel:+9112345678910">+91 12345678910</a>
	</h4>
	<p>Designed By: dvstr-image-extractor</p>
	<p>
		Some images used under license from Shutterstock, Google. &copy; 2023
		Pawsome. All rights reserved.
	</p>
</section>

<style>
	.header {
		display: flex;
		width: 1300px;
		align-items: flex-start;
		gap: 300px;
		padding: 10px 20px;
		position: relative;
		background-color: #f5f0f3;
	}
	/*-------------Services----------------*/
	.services {
		text-align: center;
		background-color: #f9f9f9;
		padding: 20px;
	}

	.services h1 {
		font-size: 28px;
		margin-bottom: 20px;
	}

	.row {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}

	.home-text05 {
		background-color: #ffffff00;
		border: 0;
	}

	input {
		border: 0;
		outline: 0;
	}
	input:focus {
		outline: none !important;
	}

	.services-col {
		flex-basis: 300px; /* Adjust this value to control the width of each card */
		margin: 10px;
		padding: 20px;
		border: 1px solid #ccc;
		border-radius: 5px;
		background-color: #fff;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	}

	.services-col img {
		width: 200px;
		height: 200px;
		border-radius: 50%; /* Make the image circular */
		object-fit: cover; /* Ensure the image retains its aspect ratio */
	}

	.services-col h3 {
		font-size: 24px;
		margin-top: 10px;
	}

	.services-col h5 {
		font-size: 16px;
		color: #211f1f;
	}

	/*--------footer------------*/
	.aboutus {
		width: 100%;
		text-align: center;
	}
	.aboutus h4 {
		margin-top: 10px;
		font-weight: 600;
	}
	.footer {
		background-color: #3cd9b7;
		width: 100%;
		text-align: center;
		padding: 10px 0;
	}
	.footer h3 {
		color: #000000;
	}

	.home-text {
		height: auto;
		font-size: 40px;
		font-style: Medium;
		text-align: left;
		font-family: Arial, Helvetica, sans-serif;
		font-weight: 400;
		line-height: normal;
		font-stretch: normal;
		text-decoration: none;
	}

	.home-text02 {
		color: rgb(0, 0, 0);
		height: auto;
		font-size: 20px;
		font-style: Bold;
		text-align: left;
		font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
		font-weight: 700;
		line-height: normal;
		font-stretch: normal;
		text-decoration: none;
	}

	.home-searchbar {
		gap: 500px;
		display: flex;
		align-items: center;
		flex-direction: column;
		margin-bottom: 200px;
	}

	.home-urlbar {
		gap: 10px;
		width: 600px;
		display: flex;
		padding: 10px;
		align-items: center;
		flex-shrink: 0;
		border-color: rgb(255, 255, 255);
		border-style: solid;
		border-width: 1px;
		border-radius: 10px;
	}

	.home-button {
		gap: 10px;
		width: 106px;
		display: flex;
		padding: 10px;
		align-items: center;
		flex-shrink: 0;
		border-radius: 25px;
		justify-content: center;
		background-color: rgb(255, 255, 255);
	}

	.res-load {
		display: flex;
		flex-direction: row;
		justify-content: center;
		position: relative;

		/* background-size: cover; */
	}
	.header {
		background-image: url(img/background.jpg);
		/* min-height: 120vh; */
		width: 100%;
		background-color: rgba(0, 0, 0, 0.6);
		background-position: center;
		background-size: cover;
		position: relative;
	}
	.res-load .div {
		background-color: transparent;
		background-size: cover;
		position: relative;
	}

	.res-load .main-res-frame {
		display: flex;
		flex-direction: column;
		width: 1300px;
		align-items: flex-start;
		gap: 100px;
		position: relative;
		top: 152px;
		left: 0;
	}

	.res-load .main-res-frame-2 {
		display: flex;
		width: 1250px;
		align-items: center;
		gap: 100px;
		padding: 0px 50px;
		position: relative;
		flex: 0 0 auto;
	}

	.res-load .side-bar-sort {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 31px;
		padding: 0px 10px;
		position: relative;
	}

	.res-load .sort {
		display: flex;
		flex-direction: column;
		width: 500px;
		align-items: center;
		gap: 9px;
		position: relative;
		flex: 0 0 auto;
	}

	.res-load .sort-head {
		display: flex;
		align-items: center;
		gap: 71px;
		position: relative;
		align-self: stretch;
		width: 100%;
		flex: 0 0 auto;
	}

	.res-load .text-wrapper {
		position: relative;
		flex: 1;
		font-family: "Jost-Medium", Helvetica;
		font-weight: 500;
		color: #ffffff;
		font-size: 18px;
		letter-spacing: 0;
		line-height: normal;
	}

	.res-load .sort-menu {
		display: flex;
		width: 486px;
		align-items: center;
		gap: 10px;
		padding: 15px 10px;
		position: relative;
		flex: 0 0 auto;
		background-color: #ffffff;
		border-radius: 10px;
		border: 1px solid;
		border-color: #3f392e;
	}

	.res-load .filter {
		flex-direction: column;
		width: 500px;
		gap: 20px;
		display: flex;
		align-items: flex-start;
		position: relative;
		flex: 0 0 auto;
	}

	.res-load .text-wrapper-3 {
		position: relative;
		width: 181px;
		margin-top: -1px;
		font-family: "Jost-Medium", Helvetica;
		font-weight: 500;
		color: #ffffff;
		font-size: 18px;
		letter-spacing: 0;
		line-height: normal;
	}

	.res-load .filter-menu {
		width: 489px;
		gap: 10px;
		padding: 15px 25px 15px 10px;
		background-color: #f5f0f3;
		border-radius: 10px;
		border: 1px solid;
		border-color: #3f392e;
		display: flex;
		align-items: flex-start;
		position: relative;
		flex: 0 0 auto;
	}

	.res-load .text-wrapper-4 {
		position: relative;
		width: fit-content;
		margin-top: -7px;
		margin-bottom: -5px;
		font-family: "Jost-Medium", Helvetica;
		font-weight: 500;
		color: #3f392e;
		font-size: 15px;
		letter-spacing: 0;
		line-height: normal;
	}

	.res-load .download-buttons {
		display: flex;
		flex-direction: column;
		width: 500px;
		align-items: center;
		justify-content: center;
		gap: 20px;
		position: relative;
		flex: 0 0 auto;
	}

	.res-load .select-deselect {
		display: flex;
		height: 37px;
		align-items: center;
		justify-content: center;
		gap: 10px;
		position: relative;
		align-self: stretch;
		width: 100%;
	}

	.res-load .white-button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 10px;
		padding: 5px 10px;
		position: relative;
		flex: 0 0 auto;
		margin-top: -1px;
		margin-bottom: -1px;
		background-color: #f5f0f3;
		border-radius: 10px;
		box-shadow: 0px 4px 4px #00000040;
	}

	.res-load .img {
		position: relative;
		width: 18px;
		height: 18px;
	}

	.res-load .text-wrapper-11 {
		position: relative;
		width: fit-content;
		margin-top: -1px;
		font-family: "Jost-Bold", Helvetica;
		font-weight: 700;
		/* color: #282445; */
		font-size: 20px;
		letter-spacing: 0;
		line-height: normal;
	}

	.res-load .res-frame {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 20px;
		position: relative;
		flex: 1;
		align-self: stretch;
		flex-grow: 1;
	}

	.res-load .result-header {
		display: flex;
		width: 452px;
		align-items: center;
		gap: 10px;
		padding: 10px;
		position: relative;
		flex: 0 0 auto;
	}

	.res-load .showing-images-from {
		position: relative;
		flex: 1;
		margin-top: -1px;
		font-family: "Jost-Regular", Helvetica;
		font-weight: 400;
		color: #000000;
		font-size: 18px;
		letter-spacing: 0;
		line-height: normal;
	}

	.res-load .span {
		font-family: "Jost-Regular", Helvetica;
		font-weight: 400;
		color: #000000;
		font-size: 18px;
		letter-spacing: 0;
	}

	.res-load .text-wrapper-13 {
		font-family: "Jost-SemiBold", Helvetica;
		font-weight: 600;
		font-size: 20px;
	}

	.res-load .image-frame-vertical {
		display: flex;
		align-items: flex-end;
		gap: 230px;
		padding: 10px 20px;
		position: relative;
		align-self: stretch;
		width: 100%;
		flex: 0 0 auto;
		background-color: #f5f0f3;
		border-radius: 5px;
		box-shadow: 0px 4px 4px #00000040;
	}

	.res-load .frame-2 {
		display: flex;
		align-items: center;
		gap: 23px;
		position: relative;
		flex: 1;
		flex-grow: 1;
	}

	.res-load .rectangle {
		position: relative;
		width: 100px;
		height: 100px;
	}

	.res-load .text-wrapper-14 {
		position: relative;
		width: fit-content;
		font-family: "Jost-Medium", Helvetica;
		font-weight: 500;
		color: #282445;
		font-size: 18px;
		letter-spacing: 0;
		line-height: normal;
	}

	.res-load .frame-3 {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		gap: 15px;
		position: relative;
		flex: 1;
		flex-grow: 1;
	}

	.res-load .file-size {
		display: inline-flex;
		height: 30px;
		align-items: center;
		justify-content: center;
		gap: 10px;
		padding: 8px 15px;
		position: relative;
		flex: 0 0 auto;
		border-radius: 10px;
		border: 1px solid;
		border-color: #282445;
	}

	.res-load .text-wrapper-15 {
		position: relative;
		width: fit-content;
		margin-top: -5px;
		margin-bottom: -3px;
		font-family: "Jost-Medium", Helvetica;
		font-weight: 500;
		color: #282445;
		font-size: 15px;
		letter-spacing: 0;
		line-height: normal;
	}

	.res-load .image-type {
		display: inline-flex;
		height: 30px;
		align-items: center;
		justify-content: center;
		gap: 10px;
		padding: 10px;
		position: relative;
		flex: 0 0 auto;
		background-color: #f7e332;
		border-radius: 10px;
	}

	.res-load .frame-4 {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		position: relative;
		flex: 0 0 auto;
	}
</style>
