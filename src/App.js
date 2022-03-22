import './App.css';
import React, { useState } from 'react';
import { Octokit } from "@octokit/rest";



/*
const octokit = new Octokit({
  auth: "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",
  userAgent: "octokit-test",
  baseUrl: "https://api.github.com",
});

async function createGist() {
  try {
    await octokit.rest.gists.create({
      description: "I created this gist using Octokit!",
      public: true,
      files: {
        "test.md": {
          content: `# dies ist mein erstes Octokit-Gist!`,
        }
      },
    });
  } 
  catch (error) {
    console.error(`Unable to create gist\n${error}`);
  }
}

(async () => {
  await createGist();
})();

*/

function App(){
	

	const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);

	

	const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);
	};

	const handleSubmission = () => {
		const formData = new FormData();

		formData.append('File', selectedFile);
    
    /*
		fetch(
			'https://freeimage.host/api/1/upload?key=<YOUR_API_KEY>',
			{
				method: 'POST',
				body: formData,
			}
		)
			.then((response) => response.json())
			.then((result) => {
				console.log('Success:', result);
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	};
	};
  */
  };
	return(
   <div>
			<input type="file" name="file" onChange={changeHandler} />
			{isFilePicked ? (
				<div>
					<p>Filename: {selectedFile.name}</p>
					<p>Filetype: {selectedFile.type}</p>
					<p>Size in bytes: {selectedFile.size}</p>
					<p>
						lastModifiedDate:{' '}
						{selectedFile.lastModifiedDate.toLocaleDateString()}
					</p>
				</div>
			) : (
				<p>Select a file to show details</p>
			)}

			<div>
				<button onClick={handleSubmission}>Submit</button>
			</div>
			
		</div>
	)
}

export default App;
