import React, { useRef } from 'react';
import { fileUpload, selectUpload, setIsFilePicked, setSelectedFile, setFileContent } from '../redux/slices/uploadSlice';
import { selectLogin } from '../redux/slices/loginSlice';
import { decrypt } from './encrypt';
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from 'react-alert'


// for Checking file type...
const allowExts = ['txt', 'csv', 'md', 'markdown', 'xml', 'json', 'js', 'py'];
function getExt(filename)
	{
		var pos = filename.lastIndexOf('.');
		if (pos === -1) return '';
		return filename.slice(pos + 1);
	}

function checkExt(filename)
	{
		const ext = getExt(filename).toLowerCase();
		if (allowExts.indexOf(ext) === -1) return true;
		return false;
	}


function Upload(){
	
	const dispatch = useDispatch();
	const { isLoggedIn, token } = useSelector(selectLogin);
	const { isFilePicked, selectedFile, fileContent } = useSelector(selectUpload);
	const inputRefFile = useRef();
	const fileAlert = useAlert();

	const changeHandler = (event) => {
		dispatch(setSelectedFile(event.target.files[0]));
		dispatch(setIsFilePicked());
		
		const reader = new FileReader();
  		reader.onload = function(event) {
   		  dispatch(setFileContent(event.target.result));
  		};

  		reader.readAsText(event.target.files[0]);
	};

	const handleSubmission = async () => {
		const fileName = selectedFile.name;
		

		if (!isLoggedIn){
			fileAlert.error('Token absent');
		} else if (!isFilePicked){
			fileAlert.error('Please pick a file');
		}
		else if (checkExt(fileName)){
			fileAlert.error('Please choose a valid file');
		}
		else {
		
		const obj = [decrypt(token), fileName, fileContent];
		
		const resultFileUpload = await dispatch(fileUpload(obj));
		if (fileUpload.fulfilled.match(resultFileUpload)) {
			fileAlert.show('Upload completed');
			inputRefFile.current.value = '';
		}
		if (fileUpload.rejected.match(resultFileUpload)) {
			fileAlert.error('Upload failed');
		}
		}
	};
	return(
   <div>
			<input type="file" name="file" ref={inputRefFile} accept=".txt, .csv, .md, .markdown, .xml, .json, .js, .py" onChange={event => changeHandler(event)} />
			<p>You can upload one file (.txt, .csv, .md, .markdown, .xml, .json, .js, .py) as a gist in your Github account</p>
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
				<button onClick={handleSubmission}>Create gist</button>
			</div>
			
		</div>
	)
}

export default Upload;
