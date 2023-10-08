<script>
	let url = '';
	let imgUrls = [];
  
	const scrape = async () => {
	  try {
		const response = await fetch('http://localhost:3001/api/scrape', {
		  method: 'POST',
		  headers: {
			'Content-Type': 'application/json',
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
		console.error('Error:', error);
	  }
	};
  </script>
  
  <main>
	<h1>Image Scraper</h1>
  
	<label for="url">Enter URL:</label>
	<input type="text" id="url" bind:value={url} />
  
	<button on:click={scrape}>Scrape Images</button>
  
	{#if imgUrls.length > 0}
	  <h2>Image URLs:</h2>
	  <ul>
		{#each imgUrls as imgUrl}
		  <li>{imgUrl}</li>
		{/each}
	  </ul>
	{/if}
  </main>
  
 