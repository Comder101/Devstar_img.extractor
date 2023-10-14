<script>
	let url = "";
	let imgUrls = [];
	let inputURL = '';

	const scrape = async () => {
		try {
			const response = await fetch("http://localhost:3001/api/scrape", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ url }),
			});

			const data = await response.json();
			if (data.success) {
				imgUrls = data.imgUrls;
			} else {
				console.error(data.error);
			}
		} catch (error) {
			console.error("Error:", error);
		}
	};

	function showResults() {
		var urlInput = document.getElementById("urlInput").value;
		if (urlInput) {
			// Assuming the 'mainresframe-container' is the div you want to display
			var resultsContainer = document.getElementById("resultsContainer");
			resultsContainer.style.display = "block";
			var siteshow = document.getElementById("site-show")
			siteshow.innerText = urlInput

			// Hide other elements if needed
			// ...
		}
	}

	function toggleImageOrientation() {
		const horizontalImage = document.querySelector(".horizontal");
		const verticalImage = document.querySelector(".vertical");

		if (horizontalImage.style.display === "block") {
			horizontalImage.style.display = "none";
			verticalImage.style.display = "block";
		} else {
			horizontalImage.style.display = "block";
			verticalImage.style.display = "none";
		}
	}

	function applyFilters() {
		const imageType = document.getElementById("imageType").value;
		const sortOption = document.getElementById("sortOptions").value;
		const images = document.querySelectorAll(
			".horizontal .image-frame-vertical .frame-2 img"
		);

		images.forEach((image) => {
			let shouldDisplay = true;

			// Check image type
			if (imageType !== "all") {
				const fileType = image.src.split(".").pop().toLowerCase();
				if (fileType !== imageType) {
					shouldDisplay = false;
				}
			}

			image.style.display = shouldDisplay ? "inline-block" : "none";
		});

		// Sorting options
		switch (sortOption) {
			case "sizeAsc":
				sortImagesBySize(images, true);
				break;
			case "sizeDesc":
				sortImagesBySize(images, false);
				break;
			case "fileSizeAsc":
				sortImagesByFileSize(images, true);
				break;
			case "fileSizeDesc":
				sortImagesByFileSize(images, false);
				break;
			case "widthAsc":
				sortImagesByDimension(images, "width", true);
				break;
			case "widthDesc":
				sortImagesByDimension(images, "width", false);
				break;
			case "heightAsc":
				sortImagesByDimension(images, "height", true);
				break;
			case "heightDesc":
				sortImagesByDimension(images, "height", false);
				break;
			case "nameAsc":
				sortImagesByName(images, true);
				break;
			case "nameDesc":
				sortImagesByName(images, false);
				break;
			default:
				break;
		}
		// Hide the download button for non-visible images
		images.forEach((image) => {
			const imageItem = image.closest(".image-frame-vertical");
			if (imageItem) {
				imageItem.querySelector("button").style.display =
					image.style.display;
			}
		});

		// Add click event listener to toggle selection
		images.forEach((image) => {
			image.addEventListener("click", () => {
				toggleSelection(image);
			});
		});
		// Add click event listener to toggle selection
		images.forEach((image) => {
			image.addEventListener("click", () => {
				console.log("Image clicked:", image.src);
				toggleSelection(image);
			});
		});
	}

	function sortImagesBySize(images, ascending) {
		images.forEach((image) =>
			image.setAttribute("data-size", image.src.length)
		);
		imagesContainer = document.querySelector(
			".horizontal .image-frame-vertical .frame-2"
		);
		[...images]
			.sort((a, b) =>
				ascending
					? a.getAttribute("data-size") - b.getAttribute("data-size")
					: b.getAttribute("data-size") - a.getAttribute("data-size")
			)
			.forEach((image) => imagesContainer.appendChild(image));
	}

	function sortImagesByFileSize(images, ascending) {
		images.forEach((image) =>
			image.setAttribute("data-size", image.src.length)
		);
		imagesContainer = document.querySelector(
			".horizontal .image-frame-vertical .frame-2"
		);
		[...images]
			.sort((a, b) =>
				ascending
					? a.getAttribute("data-size") - b.getAttribute("data-size")
					: b.getAttribute("data-size") - a.getAttribute("data-size")
			)
			.forEach((image) => imagesContainer.appendChild(image));
	}

	function sortImagesByDimension(images, dimension, ascending) {
		images.forEach((image) =>
			image.setAttribute(`data-${dimension}`, image.naturalWidth)
		);
		imagesContainer = document.querySelector(
			".horizontal .image-frame-vertical .frame-2"
		);
		[...images]
			.sort((a, b) =>
				ascending
					? a.getAttribute(`data-${dimension}`) -
					  b.getAttribute(`data-${dimension}`)
					: b.getAttribute(`data-${dimension}`) -
					  a.getAttribute(`data-${dimension}`)
			)
			.forEach((image) => imagesContainer.appendChild(image));
	}

	function sortImagesByName(images, ascending) {
		images.forEach((image) =>
			image.setAttribute("data-name", image.alt.toLowerCase())
		);
		imagesContainer = document.querySelector(
			".horizontal .image-frame-vertical .frame-2"
		);
		[...images]
			.sort((a, b) =>
				ascending
					? a
							.getAttribute("data-name")
							.localeCompare(b.getAttribute("data-name"))
					: b
							.getAttribute("data-name")
							.localeCompare(a.getAttribute("data-name"))
			)
			.forEach((image) => imagesContainer.appendChild(image));
	}

	function downloadImage(imageSrc, fileName) {
		const link = document.createElement("a");
		link.href = imageSrc;
		link.download = fileName;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
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
		var image = document.getElementById("imageToCopy");

		// Ensure an image is selected
		if (image && image.src) {
			var imageUrl = image.src;
			copyToClipboard(imageUrl);
			alert("Image URL copied to clipboard: " + imageUrl);
		}
	}

	function copyToClipboard(text) {
		var textarea = document.createElement("textarea");
		textarea.value = text;
		document.body.appendChild(textarea);
		textarea.select();
		document.execCommand("copy");
		document.body.removeChild(textarea);
	}
</script>
<div class="entire-page">
<div class="header">
	<div class="image-extractor">
	  <img class="image" src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-image-512.png" alt="1" />
	  <div class="text-wrapper">Image Extractor</div>
	</div>
	<div class="nav-bar">
	  <a class="button" href="#home.html">Home</a>
	  <a class="button" href="#aboutus">About us</a>
	  <a class="button" href="#faq">Help Center</a>
	</div>
	<div class="login">
	  <a class="button" href="/login.html">Login</a>
	  <a class="button" href="/signup.html">Sign up</a>
	</div>
  </div>  
  <div class="res-load">
	<div class="div">
		<div class="home-container">
			<div class="home-frame14">
				<div class="home-heading">
					<span class="home-text"><span>Extract Image</span></span>
					<br />
					<span class="home-text02"
						><span>from any public website!</span></span
					>
				</div>
				<div class="home-searchbar">
					<input
						id="urlInput"
						type="text"
						name= 'url-bar'
						placeholder="Enter any URL"
					/>
					<button on:click={showResults} class="home-button">
						Extract
					</button>
				</div>
			</div>
		</div>
		<div class="main-res-frame">
			<div
				class="main-res-frame-2"
				id="resultsContainer"
				style="display: none;"
			>
				<div class="side-bar-sort">
					<div class="sort">
						<div class="sort-head">
							<div class="text-wrapper" style="align-items: center;">
								<label for="sortOptions">Sort By:</label>
							</div>
						</div>
						<div class="sort-menu">
							<select id="sortOptions" on:change={applyFilters}>
								<option value="default">Default</option>
								<option value="sizeAsc"
									>Image Size (Smallest to Largest)</option
								>
								<option value="sizeDesc"
									>Image Size (Largest to Smallest)</option
								>
								<option value="fileSizeAsc"
									>File Size (Smallest to Largest)</option
								>
								<option value="fileSizeDesc"
									>File Size (Largest to Smallest)</option
								>
								<option value="widthAsc"
									>Image Width (Smallest to Largest)</option
								>
								<option value="widthDesc"
									>Image Width (Largest to Smallest)</option
								>
								<option value="heightAsc"
									>Image Height (Smallest to Largest)</option
								>
								<option value="heightDesc"
									>Image Height (Largest to Smallest)</option
								>
								<option value="nameAsc"
									>Image Name (A to Z)</option
								>
								<option value="nameDesc"
									>Image Name (Z to A)</option
								>
							</select>
						</div>
					</div>
					<div class="filter">
						<div class="text-wrapper-3">Filter images by type</div>
						<div class="filter-menu">
							<div class="image-type-filter">
								<div class="text-wrapper-4">ICO (1)</div>
							</div>
							<div class="div-wrapper">
								<div class="text-wrapper-5">PNG (1)</div>
							</div>
							<div class="image-type-filter-2">
								<div class="text-wrapper-6">SVG (1)</div>
							</div>
							<div class="image-type-filter-3">
								<div class="text-wrapper-7">JPEG (1)</div>
							</div>
							<div class="image-type-filter-4">
								<div class="text-wrapper-8">GIF (1)</div>
							</div>
						</div>
					</div>
					<div class="download-buttons">
						<div class="select-deselect">
							<div class="white-button" on:click={selectAll}>
								<img
									class="img"
									src="https://static.thenounproject.com/png/542179-200.png"
									alt="a"
								/>
								<div class="text-wrapper-11">Select All
								</div>
							</div>
							<div class="white-button" on:click={deselectAll}>
								<img
									class="img"
									src="https://static.thenounproject.com/png/1461827-200.png"
									alt="h"
								/>
								<div class="text-wrapper-11">Deselect All
								</div>
							</div>
						</div>
						<div class="white-button-2">
							<img
								class="img"
								src="https://cdn0.iconfinder.com/data/icons/google-material-design-3-0/48/ic_content_paste_48px-512.png"
								alt="k"
							/>
							<div class="copy-selected-urls">
								Copy selected URLs
							</div>
						</div>
						<div class="white-button-3">
							<img class="img" src="https://iihl.org/wp-content/uploads/2020/02/download-icon-white-png-1.png" alt="j" />
							<div class="text-wrapper-12">Download Selected</div>
						</div>
						<div class="white-button-2" on:click={toggleImageOrientation}>
							<img 
								class="img"
								src="https://icons.veryicon.com/png/o/miscellaneous/itsm-management/change-management.png"
								alt="k"
							/>
							<div class="copy-selected-urls" >
								Toggle Image Orientation
							</div>
						</div>
					</div>
				</div>
				<div class="res-frame">
					<div class="result-header">
						<p class="showing-images-from">
							<span class="span">Showing images from </span>
							<span id= 'site-show' class="text-wrapper-13">??</span>
						</p>
					</div>
					<div class="horizontal">
						<div class="image-frame-vertical" data-selected="false">
							<div class="frame-2">
								<img
									class="rectangle"
									src="./images/image.jpg"
									alt="image1"
									id="imageToCopy"
								/>
								<div class="text-wrapper-14">Image_name</div>
							</div>
							<div class="frame-3">
								<div class="file-size">
									<div class="text-wrapper-15">980 KB</div>
								</div>
								<div class="image-type">
									<div class="text-wrapper-4">ICO</div>
								</div>
								<div class="frame-4">
									<button on:click={copyImageUrl}
										>Copy Image URL</button
									>
									<button
										on:click={() =>
											downloadImage(
												"./images/image.jpg",
												"image.jpg"
											)}>Download</button
									>
								</div>
							</div>
						</div>
						<div class="image-frame-vertical" data-selected="false">
							<div class="frame-2">
								<img
									class="rectangle"
									src="./images/image.jpg"
									alt="image1"
									id="imageToCopy"
								/>
								<div class="text-wrapper-14">Image_name</div>
							</div>
							<div class="frame-3">
								<div class="file-size">
									<div class="text-wrapper-15">980 KB</div>
								</div>
								<div class="image-type">
									<div class="text-wrapper-4">ICO</div>
								</div>
								<div class="frame-4">
									<button on:click={copyImageUrl}
										>Copy Image URL</button
									>
									<button
										on:click={() =>
											downloadImage(
												"./images/image.jpg",
												"image.jpg"
											)}>Download</button
									>
								</div>
							</div>
						</div>
						<div class="image-frame-vertical" data-selected="false">
							<div class="frame-2">
								<img
									class="rectangle"
									src="./images/image.jpg"
									alt="image1"
									id="imageToCopy"
								/>
								<div class="text-wrapper-14">Image_name</div>
							</div>
							<div class="frame-3">
								<div class="file-size">
									<div class="text-wrapper-15">980 KB</div>
								</div>
								<div class="image-type">
									<div class="text-wrapper-4">ICO</div>
								</div>
								<div class="frame-4">
									<button on:click={copyImageUrl}
										>Copy Image URL</button
									>
									<button
										on:click={() =>
											downloadImage(
												"./images/image.jpg",
												"image.jpg"
											)}>Download</button
									>
								</div>
							</div>
						</div>
						<div class="image-frame-vertical" data-selected="false">
							<div class="frame-2">
								<img
									class="rectangle"
									src="./images/image.jpg"
									alt="image1"
									id="imageToCopy"
								/>
								<div class="text-wrapper-14">Image_name</div>
							</div>
							<div class="frame-3">
								<div class="file-size">
									<div class="text-wrapper-15">980 KB</div>
								</div>
								<div class="image-type">
									<div class="text-wrapper-4">ICO</div>
								</div>
								<div class="frame-4">
									<button on:click={copyImageUrl}
										>Copy Image URL</button
									>
									<button
										on:click={() =>
											downloadImage(
												"./images/image.jpg",
												"image.jpg"
											)}>Download</button
									>
								</div>
							</div>
						</div>
						<div class="image-frame-vertical" data-selected="false">
							<div class="frame-2">
								<img
									class="rectangle"
									src="./images/image.jpg"
									alt="image1"
									id="imageToCopy"
								/>
								<div class="text-wrapper-14">Image_name</div>
							</div>
							<div class="frame-3">
								<div class="file-size">
									<div class="text-wrapper-15">980 KB</div>
								</div>
								<div class="image-type">
									<div class="text-wrapper-4">ICO</div>
								</div>
								<div class="frame-4">
									<button on:click={copyImageUrl}
										>Copy Image URL</button
									>
									<button
										on:click={() =>
											downloadImage(
												"./images/image.jpg",
												"image.jpg"
											)}>Download</button
									>
								</div>
							</div>
						</div>
						<div class="image-frame-vertical" data-selected="false">
							<div class="frame-2">
								<img
									class="rectangle"
									src="./images/image.jpg"
									alt="image1"
									id="imageToCopy"
								/>
								<div class="text-wrapper-14">Image_name</div>
							</div>
							<div class="frame-3">
								<div class="file-size">
									<div class="text-wrapper-15">980 KB</div>
								</div>
								<div class="image-type">
									<div class="text-wrapper-4">ICO</div>
								</div>
								<div class="frame-4">
									<button on:click={copyImageUrl}
										>Copy Image URL</button
									>
									<button
										on:click={() =>
											downloadImage(
												"./images/image.jpg",
												"image.jpg"
											)}>Download</button
									>
								</div>
							</div>
						</div>
						<div class="image-frame-vertical" data-selected="false">
							<div class="frame-2">
								<img
									class="rectangle"
									src="./images/image.jpg"
									alt="image1"
									id="imageToCopy"
								/>
								<div class="text-wrapper-14">Image_name</div>
							</div>
							<div class="frame-3">
								<div class="file-size">
									<div class="text-wrapper-15">980 KB</div>
								</div>
								<div class="image-type">
									<div class="text-wrapper-4">ICO</div>
								</div>
								<div class="frame-4">
									<button on:click={copyImageUrl}
										>Copy Image URL</button
									>
									<button
										on:click={() =>
											downloadImage(
												"./images/image.jpg",
												"image.jpg"
											)}>Download</button
									>
								</div>
							</div>
						</div>
						<div class="image-frame-vertical" data-selected="false">
							<div class="frame-2">
								<img
									class="rectangle"
									src="./images/image.jpg"
									alt="image1"
									id="imageToCopy"
								/>
								<div class="text-wrapper-14">Image_name</div>
							</div>
							<div class="frame-3">
								<div class="file-size">
									<div class="text-wrapper-15">980 KB</div>
								</div>
								<div class="image-type">
									<div class="text-wrapper-4">ICO</div>
								</div>
								<div class="frame-4">
									<button on:click={copyImageUrl}
										>Copy Image URL</button
									>
									<button
										on:click={() =>
											downloadImage(
												"./images/image.jpg",
												"image.jpg"
											)}>Download</button
									>
								</div>
							</div>
						</div>
						<div class="image-frame-vertical" data-selected="false">
							<div class="frame-2">
								<img
									class="rectangle"
									src="./images/image.jpg"
									alt="image1"
									id="imageToCopy"
								/>
								<div class="text-wrapper-14">Image_name</div>
							</div>
							<div class="frame-3">
								<div class="file-size">
									<div class="text-wrapper-15">980 KB</div>
								</div>
								<div class="image-type">
									<div class="text-wrapper-4">ICO</div>
								</div>
								<div class="frame-4">
									<button on:click={copyImageUrl}
										>Copy Image URL</button
									>
									<button
										on:click={() =>
											downloadImage(
												"./images/image.jpg",
												"image.jpg"
											)}>Download</button
									>
								</div>
							</div>
						</div>
						<div class="image-frame-vertical" data-selected="false">
							<div class="frame-2">
								<img
									class="rectangle"
									src="./images/image.jpg"
									alt="image1"
									id="imageToCopy"
								/>
								<div class="text-wrapper-14">Image_name</div>
							</div>
							<div class="frame-3">
								<div class="file-size">
									<div class="text-wrapper-15">980 KB</div>
								</div>
								<div class="image-type">
									<div class="text-wrapper-4">ICO</div>
								</div>
								<div class="frame-4">
									<button on:click={copyImageUrl}
										>Copy Image URL</button
									>
									<button
										on:click={() =>
											downloadImage(
												"./images/image.jpg",
												"image.jpg"
											)}>Download</button
									>
								</div>
							</div>
						</div>
						<div class="image-frame-vertical" data-selected="false">
							<div class="frame-2">
								<img
									class="rectangle"
									src="./images/image.jpg"
									alt="image1"
									id="imageToCopy"
								/>
								<div class="text-wrapper-14">Image_name</div>
							</div>
							<div class="frame-3">
								<div class="file-size">
									<div class="text-wrapper-15">980 KB</div>
								</div>
								<div class="image-type">
									<div class="text-wrapper-4">ICO</div>
								</div>
								<div class="frame-4">
									<button on:click={copyImageUrl}
										>Copy Image URL</button
									>
									<button
										on:click={() =>
											downloadImage(
												"./images/image.jpg",
												"image.jpg"
											)}>Download</button
									>
								</div>
							</div>
						</div>
					</div>
					<div class="vertical" style="display: none;">
						<div class="box">
							<div class="image-frame">
								<div class="property-hover">
									<div
										class="size-select"
										data-selected="false"
									>
										<div class="select" />
										<div class="image-dim">
											<div class="text-wrapper">
												1600 x 1200
											</div>
										</div>
									</div>
									<div class="image-main">
										<img
											class="rectangle"
											src="./images/image.jpg"
											alt="image1"
										/>
										<div class="div">Image_name</div>
									</div>
									<div class="image-tail">
										<div class="image-type">
											<div class="div-wrapper">
												<div class="text-wrapper-2">
													ICO
												</div>
											</div>
											<div class="file-size">
												<div class="text-wrapper-3">
													980 KB
												</div>
											</div>
										</div>
										<div class="frame">
											<button on:click={copyImageUrl}
												>Copy Image URL</button
											>
											<button
												on:click={() =>
													downloadImage(
														"./images/image.jpg",
														"image.jpg"
													)}>Download</button
											>
										</div>
									</div>
								</div>
								<div class="property-selected">
									<div
										class="size-select"
										data-selected="false"
									>
										<div class="image-dim">
											<div class="text-wrapper">
												1600 x 1200
											</div>
										</div>
									</div>
									<div class="image-main">
										<img
											class="rectangle"
											src="./images/image.jpg"
											alt="image1"
										/>
										<div class="div">Image_name</div>
									</div>
									<div class="image-tail">
										<div class="image-type">
											<div class="div-wrapper">
												<div class="text-wrapper-2">
													ICO
												</div>
											</div>
											<div class="file-size">
												<div class="text-wrapper-3">
													980 KB
												</div>
											</div>
										</div>
										<div class="frame">
											<button on:click={copyImageUrl}
												>Copy Image URL</button
											>
											<button
												on:click={() =>
													downloadImage(
														"./images/image.jpg",
														"image.jpg"
													)}>Download</button
											>
										</div>
									</div>
								</div>
								<div class="property-default">
									<div
										class="size-select"
										data-selected="false"
									>
										<div class="image-dim">
											<div class="text-wrapper">
												1600 x 1200
											</div>
										</div>
									</div>
									<div class="image-main">
										<img
											class="rectangle"
											src="./images/image.jpg"
											alt="image1"
										/>
										<div class="div">Image_name</div>
									</div>
									<div class="image-tail">
										<div class="image-type">
											<div class="div-wrapper">
												<div class="text-wrapper-2">
													ICO
												</div>
											</div>
											<div class="file-size">
												<div class="text-wrapper-3">
													980 KB
												</div>
											</div>
										</div>
										<div class="frame">
											<button on:click={copyImageUrl}
												>Copy Image URL</button
											>
											<button
												on:click={() =>
													downloadImage(
														"./images/image.jpg",
														"image.jpg"
													)}>Download</button
											>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="faq">
				<div class="faq-header">
					<span class="text-wrapper-16">Frequently asked questions</span>
					<span class="text-wrapper-17"
						>If you can’t find what you’re looking for, write us
						a message and we&#39;ll get back to you.</span>
				</div>
				<div class="faq-frame">
					<div class="text-wrapper-18">What is extract.pics?</div>
					<div class="lorem-ipsum-dolor">
						Lorem ipsum dolor sit amet consectetur. Orci
						consequat congue orci etiam mattis aliquam tincidunt
						felis porttitor. Tortor turpis aliquam ullamcorper
						nam erat consequat. Et amet pellentesque turpis eget
						ac justo eu gravida. Sed sodales feugiat mauris
						aliquam blandit justo bibendum proin. Pretium risus
						quis varius vestibulum sed leo cras morbi. Cras
						lectus ut mattis ligula pretium lacus commodo.
						Ullamcorper nam consequat morbi eros lorem sit. Et
						ullamcorper consequat sit nunc eget quam. Lacus
						massa magna scelerisque ac interdum.
					</div>
				</div>

				<div class="faq-frame">
					<div class="text-wrapper-18">What is extract.pics?</div>
					<div class="lorem-ipsum-dolor">
						Lorem ipsum dolor sit amet consectetur. Orci
						consequat congue orci etiam mattis aliquam tincidunt
						felis porttitor. Tortor turpis aliquam ullamcorper
						nam erat consequat. Et amet pellentesque turpis eget
						ac justo eu gravida. Sed sodales feugiat mauris
						aliquam blandit justo bibendum proin. Pretium risus
						quis varius vestibulum sed leo cras morbi. Cras
						lectus ut mattis ligula pretium lacus commodo.
						Ullamcorper nam consequat morbi eros lorem sit. Et
						ullamcorper consequat sit nunc eget quam. Lacus
						massa magna scelerisque ac interdum.
					</div>
				</div>
				<div class="faq-frame">
					<div class="text-wrapper-18">What is extract.pics?</div>
					<div class="lorem-ipsum-dolor">
						Lorem ipsum dolor sit amet consectetur. Orci
						consequat congue orci etiam mattis aliquam tincidunt
						felis porttitor. Tortor turpis aliquam ullamcorper
						nam erat consequat. Et amet pellentesque turpis eget
						ac justo eu gravida. Sed sodales feugiat mauris
						aliquam blandit justo bibendum proin. Pretium risus
						quis varius vestibulum sed leo cras morbi. Cras
						lectus ut mattis ligula pretium lacus commodo.
						Ullamcorper nam consequat morbi eros lorem sit. Et
						ullamcorper consequat sit nunc eget quam. Lacus
						massa magna scelerisque ac interdum.
					</div>
				</div>
			</div>
			<footer>
				<div class="frame-7">
					<img class="img-2" src="https://1000logos.net/wp-content/uploads/2021/07/Copyright-Symbol.png" alt="" />
					<div class="text-wrapper-19">image-extract</div>
				</div>
				<div class="frame-8">
					<div class="text-wrapper-20">Status</div>
					<div class="text-wrapper-20">Changelog</div>
					<div class="text-wrapper-20">Documentation</div>
					<div class="text-wrapper-20">Privacy and Cookie</div>
					<div class="text-wrapper-20">Terms of service</div>
				</div>
			</footer>
		</div>
	</div>
</div>
</div>
<style>
	.entire-page{
		max-width: 100%;
	}
	.header {
		display: flex;
		width: 100%;
		align-items: flex-start;
		flex-wrap: wrap;
		padding: 10px;
		background-color: #f5f0f3;
		justify-content: space-between;
	}

	.header .image-extractor {
		display: flex;
		align-items: center;
		gap: 5px;
		flex: 1;
		flex-grow: 1;
	}

	.header .nav-bar {
		display: flex;
		flex: 1;
		flex-grow: 1;
		align-items: center;
		justify-content: center;
		gap: 10px;
	}

	.nav-bar .button {
		display: inline-block;
		padding: 10px 20px;
		font-family: "Jost", Helvetica;
		font-size: 15px;
		font-weight: bold;
		color: #282445;
		border-radius: 25px;
		text-decoration: none;
		transition: background-color 0.2s;
	}

	.nav-bar .button:hover {
		background-color: #4750a18f;
		color: #f5f0f3;
	}

	.header .login {
		display: flex;
		flex: 1;
		flex-grow: 1;
		justify-content: flex-end;
		gap: 10px;
		align-items: center;
	}

	.login .button {
		display: inline-block;
		padding: 10px 20px;
		font-family: "Jost", Helvetica;
		font-size: 15px;
		background-color: #6b73c1;
		color: #f5f0f3;
		border-radius: 25px;
		text-decoration: none;
		transition: background-color 0.2s;
	}

	.login .button:hover{
		background-color: #2b3277;
	}

	.image-extractor .image {
		position: relative;
		width: 32px;
		height: 32px;

	}

	.image-extractor .text-wrapper {
		position: relative;
		width: fit-content;
		margin-top: -1px;
		font-family: "Jost-Medium", Helvetica;
		font-weight: 500;
		color: #282445;
		font-size: 25px;
		letter-spacing: 0;
		line-height: normal;
	}

	@media (max-width: 768px) {
	.header {
		flex-direction: column; 
		align-items: center;
		text-align: center; 
	}

	.header .image-extractor,
	.header .nav-bar,
	.header .login {
		margin-bottom: 10px; 
	}

	.res-load, .main-res-frame{
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		padding: 10px; 
	}

	.faq-frame{
		width: 100%;
	}

}
	.res-load {
		background: url("https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80") center/cover;
		display: flex;
		flex-direction: row;
		justify-content: center;
		position: relative;
	}

	.res-load .div {
		background-color: #28244579;
		background-size: crgba(109, 234, 243, 0.356);		
		position: relative;
	}

	.home-container{
		color: #F5F0F3;
		height: auto;
		font-style: Medium;
		text-align: center;
		font-family: "Jost-Medium", Helvetica;
		padding: 60px; 
	}

	.home-text {
		font-size: 60px;
		font-style: Medium;
		font-weight: 500;
	}

	.home-text02 {
		font-size: 20px;
		font-weight: 300;
	}

	.home-searchbar {
		gap: 43px;
		display: flex;
		align-items: center;
		flex-direction: column;
		padding-top: 40px;
	}

	.home-searchbar input{
		width: 578px;
		display: flex;
		padding: 10px;
		flex-shrink: 0;
		border-color: #F5F0F3;
		color: #F5F0F3;
		background-color: transparent;
		border-style: solid;
		border-width: 1px;
		border-radius: 10px;
	}

	.home-searchbar input::placeholder{
		color: #f5f0f3d7;
	}


	.home-button {
		width: 106px;
		display: flex;
		padding: 10px;
		align-items: center;
		border-radius: 25px;
		justify-content: center;
		background-color: #565464;
		color: #BCACAC;

	}

	.home-button:hover {
		gap: 10px;
		width: 106px;
		display: flex;
		padding: 10px;
		align-items: center;
		flex-shrink: 0;
		border-radius: 25px;
		justify-content: center;
		background-color: #2b3277;
		color: #F5F0F3;

	}

	.res-load .main-res-frame {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		width: 100%;
		position: relative;
		padding: 10px;
	}

	.res-load .main-res-frame-2 {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		width: 100%;
		position: relative;
		padding: 10px;
	}

	.res-load .side-bar-sort {
		display: flex;
		flex-direction: column;
		width: 100%;
		align-items: center;
		justify-content: center;
		gap: 31px;
		padding: 0px 10px;
		position: relative;
	}

	.res-load .sort {
		display: flex;
		flex-direction: column;
		width: 100%;
		align-items: center;
		justify-content: center;
		gap: 9px;
		position: relative;
		padding: 10px;
	}

	.res-load .sort-head {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 71px;
		position: relative;
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
		justify-content: center;
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

	.res-load .text-wrapper-2 {
		position: relative;
		width: fit-content;
		margin-top: -1px;
		font-family: "Jost-Regular", Helvetica;
		font-weight: 400;
		color: #1c1b1f;
		font-size: 18px;
		letter-spacing: 0;
		line-height: normal;
	}

	.res-load .frame {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		justify-content: center;
		gap: 8px;
		padding: 5px 8px;
		position: relative;
		flex: 1;
		flex-grow: 1;
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

	.res-load .image-type-filter {
		display: flex;
		height: 30px;
		align-items: center;
		justify-content: center;
		gap: 10px;
		padding: 10px;
		position: relative;
		flex: 1;
		flex-grow: 1;
		background-color: #f7e332;
		border-radius: 10px;
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

	.res-load .div-wrapper {
		background-color: #96ff8d;
		display: flex;
		height: 30px;
		align-items: center;
		justify-content: center;
		gap: 10px;
		padding: 10px;
		position: relative;
		flex: 1;
		flex-grow: 1;
		border-radius: 10px;
	}

	.res-load .text-wrapper-5 {
		position: relative;
		width: fit-content;
		margin-top: -7px;
		margin-bottom: -5px;
		font-family: "Jost-Medium", Helvetica;
		font-weight: 500;
		color: #31732b;
		font-size: 15px;
		letter-spacing: 0;
		line-height: normal;
	}

	.res-load .image-type-filter-2 {
		background-color: #ffd6b0;
		display: flex;
		height: 30px;
		align-items: center;
		justify-content: center;
		gap: 10px;
		padding: 10px;
		position: relative;
		flex: 1;
		flex-grow: 1;
		border-radius: 10px;
	}

	.res-load .text-wrapper-6 {
		position: relative;
		width: fit-content;
		margin-top: -7px;
		margin-bottom: -5px;
		font-family: "Jost-Medium", Helvetica;
		font-weight: 500;
		color: #9a0c0c;
		font-size: 15px;
		letter-spacing: 0;
		line-height: normal;
	}

	.res-load .image-type-filter-3 {
		background-color: #6debf3;
		display: flex;
		height: 30px;
		align-items: center;
		justify-content: center;
		gap: 10px;
		padding: 10px;
		position: relative;
		flex: 1;
		flex-grow: 1;
		border-radius: 10px;
	}

	.res-load .text-wrapper-7 {
		position: relative;
		width: fit-content;
		margin-top: -7px;
		margin-bottom: -5px;
		font-family: "Jost-Medium", Helvetica;
		font-weight: 500;
		color: #007880;
		font-size: 15px;
		letter-spacing: 0;
		line-height: normal;
	}

	.res-load .image-type-filter-4 {
		background-color: #c784cd;
		display: flex;
		height: 30px;
		align-items: center;
		justify-content: center;
		gap: 10px;
		padding: 10px;
		position: relative;
		flex: 1;
		flex-grow: 1;
		border-radius: 10px;
	}

	.res-load .text-wrapper-8 {
		position: relative;
		width: fit-content;
		margin-top: -7px;
		margin-bottom: -5px;
		font-family: "Jost-Medium", Helvetica;
		font-weight: 500;
		color: #731a7b;
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
		padding-bottom: 20px;
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
		cursor: pointer;
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
		color: #282445;
		font-size: 20px;
		letter-spacing: 0;
		line-height: normal;
	}

	.res-load .white-button-2 {
		padding: 5px 15px;
		background-color: #f5f0f3;
		border-radius: 5px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 10px;
		position: relative;
		flex: 0 0 auto;
		cursor: pointer;
		box-shadow: 0px 4px 4px #00000040;
	}

	.res-load .copy-selected-urls {
		position: relative;
		width: fit-content;
		margin-top: -1px;
		font-family: "Jost-Bold", Helvetica;
		font-weight: 700;
		color: #282445;
		font-size: 22px;
		letter-spacing: 0;
		line-height: normal;
	}

	.res-load .white-button-3 {
		padding: 10px 15px;
		background-color: #282445;
		border-radius: 10px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 10px;
		position: relative;
		flex: 0 0 auto;
		cursor: pointer;
		box-shadow: 0px 4px 4px #00000040;
	}

	.res-load .text-wrapper-12 {
		position: relative;
		width: fit-content;
		margin-top: -1px;
		font-family: "Jost-Bold", Helvetica;
		font-weight: 700;
		color: #f5f0f3;
		font-size: 22px;
		letter-spacing: 0;
		line-height: normal;
	}

	.res-load .res-frame {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-items: center;
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
		padding: 5px;
		position: relative;
		flex: 0 0 auto;
	}

	.res-load .showing-images-from {
		position: relative;
		flex: 1;
		font-family: "Jost-Regular", Helvetica;
		font-weight: 400;
		color: #ffffff;
		font-size: 18px;
	}

	.res-load .span {
		font-family: "Jost-Regular", Helvetica;
		font-weight: 400;
		color: #ffffff;
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

	.res-load .img-2 {
		position: relative;
		width: 24px;
		height: 24px;
	}

	.res-load .faq {
		display: flex;
		gap: 50px;
		left: 20px;
		flex-direction: column;
		align-items: center;
		max-width: 100%;
	}

	.res-load .faq-header {
		display: inline-flex;
		flex: 0 0 auto;
		flex-direction: column;
		font-family: "Jost-Medium", Helvetica;
		color: #F5F0F3;
	}

	.res-load .text-wrapper-16 {
		position: relative;
		align-self: center;
		font-weight: 500;
		font-size: 35px;
		padding-bottom: 10px;

	}

	.res-load .text-wrapper-17 {
		font-weight: 400;
		font-size: 20px;
	}

	.res-load .faq-frame {
		display: flex;
		flex: 1; 
		gap: 8px;
		padding: 15px;
		flex-direction: column;
		align-items: flex-start;
		position: relative;
		font-family: "Jost-Medium", Helvetica;
		color: #F5F0F3;
		transition: background-color 0.3s ease;
	}

	.res-load .faq-frame:hover{
		background-color: #2824457e;
		border-radius: 15px;
	}

	.res-load .text-wrapper-18 {
		max-width: 100%;
		font-weight: 500;
		font-size: 25px;
	}

	.res-load .lorem-ipsum-dolor {
		max-width: 100%; 
		width: auto; 
		height: auto;
	}

	footer {
		max-width: 100%;
		flex-direction: column;
		align-items: center;
		gap: 10px;
		position: relative;
		flex: 0 0 auto;
	}

	.res-load .frame-7 {
		display: flex;
		align-self: center;
		gap: 10px;
		padding: 10px;
		position: relative;
		flex: 1;
		flex-grow: 1;
	}

	footer .img-2{
		width: 32px;
		height: 32px;

		
	}

	.res-load .text-wrapper-19 {
		font-family: "Jost-Medium", Helvetica;
		font-weight: 500;
		font-size: 20px;
	}

	.res-load .text-wrapper-20 {
		font-family: "Jost-Medium", Helvetica;
		font-weight: 500;
		color: #575656;
		font-size: 15px;
	}

	.res-load .frame-8 {
		display: flex;
		align-items: center;
		justify-content: center; 
		gap: 20px;
		padding: 10px;
		position: relative;
		flex: 1;
		flex-grow: 1;
	}

	.horizontal {
		display: flex;
		gap: 20px;
		flex-direction: column;
	}

	.box {
		position: relative;
		width: 849px;
		height: 406px;
	}

	.box .image-frame {
		width: 849px;
		height: 406px;
		top: 0;
		left: 0;
		border-radius: 5px;
		overflow: hidden;
		border: 1px dashed;
		border-color: #9747ff;
	}

	.box .property-hover {
		left: 20px;
		display: flex;
		flex-direction: column;
		width: 243px;
		align-items: center;
		justify-content: center;
		padding: 8px;
		position: absolute;
		top: 20px;
		background-color: #f5f0f3;
		border-radius: 10px;
	}

	.box .size-select {
		display: flex;
		width: 162px;
		align-items: center;
		justify-content: center;
		gap: 10px;
		padding: 10px;
		position: relative;
		flex: 0 0 auto;
	}

	.box .select {
		display: flex;
		width: 20px;
		height: 20px;
		align-items: center;
		justify-content: center;
		gap: 10px;
		position: relative;
		overflow: hidden;
	}

	.box .image-dim {
		display: inline-flex;
		height: 20px;
		align-items: center;
		justify-content: center;
		gap: 10px;
		padding: 10px;
		position: relative;
		flex: 0 0 auto;
		border-radius: 2px;
		border: 1px solid;
		border-color: #3f3b5f;
	}

	.box .text-wrapper {
		margin-top: -9.5px;
		margin-bottom: -7.5px;
		font-size: 12px;
		position: relative;
		width: fit-content;
		font-family: "Jost-Medium", Helvetica;
		font-weight: 500;
		color: #282445;
		letter-spacing: 0;
		line-height: normal;
	}

	.box .image-main {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 10px;
		position: relative;
		align-self: stretch;
		width: 100%;
		flex: 0 0 auto;
	}

	.box .rectangle {
		position: relative;
		align-self: stretch;
		width: 100%;
		height: 200px;
		background-color: #d9d9d9;
	}

	.box .div {
		position: relative;
		width: fit-content;
		font-family: "Jost-Medium", Helvetica;
		font-weight: 500;
		color: #282445;
		font-size: 18px;
		letter-spacing: 0;
		line-height: normal;
	}

	.box .image-tail {
		display: flex;
		align-items: flex-end;
		gap: 30px;
		position: relative;
		align-self: stretch;
		width: 100%;
		flex: 0 0 auto;
		background-color: #f5f0f3;
	}

	.box .image-type {
		display: flex;
		align-items: center;
		gap: 8px;
		position: relative;
		flex: 1;
		flex-grow: 1;
	}

	.box .div-wrapper {
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

	.box .text-wrapper-2 {
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

	.box .file-size {
		display: inline-flex;
		height: 30px;
		align-items: center;
		justify-content: center;
		gap: 10px;
		padding: 8px 15px;
		position: relative;
		flex: 0 0 auto;
		margin-right: -37.5px;
		border-radius: 10px;
		border: 1px solid;
		border-color: #282445;
	}

	.box .text-wrapper-3 {
		margin-top: -5px;
		margin-bottom: -3px;
		font-size: 15px;
		position: relative;
		width: fit-content;
		font-family: "Jost-Medium", Helvetica;
		font-weight: 500;
		color: #282445;
		letter-spacing: 0;
		line-height: normal;
	}

	.box .frame {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		gap: 10px;
		position: relative;
		flex: 1;
		flex-grow: 1;
	}

	.box .property-selected {
		left: 586px;
		display: flex;
		flex-direction: column;
		width: 243px;
		align-items: center;
		justify-content: center;
		padding: 8px;
		position: absolute;
		top: 20px;
		background-color: #f5f0f3;
		border-radius: 10px;
	}

	.box .property-default {
		display: flex;
		flex-direction: column;
		width: 243px;
		align-items: center;
		justify-content: center;
		padding: 8px;
		position: absolute;
		top: 20px;
		left: 303px;
		background-color: #f5f0f3;
		border-radius: 10px;
	}
</style>
