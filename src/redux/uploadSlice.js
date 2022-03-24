import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Octokit } from "@octokit/rest";


export const fileUpload = createAsyncThunk(
    "upload/fileUpload", 
    async (obj) => { 
        const octokit = new Octokit({
            auth: obj[0],
            userAgent: "octokit",
            baseUrl: "https://api.github.com",
          });

        await octokit.rest.gists.create({
              description: "pushed through octokit",
              public: true,
              files: {
                [obj[1]]: {
                  content: obj[2]
                  },
                },
              }
            );
    }
  )

  export const uploadSlice = createSlice({
    name: 'upload',
    initialState: {
      isFilePicked: false,
      selectedFile: "",
      fileContent: "",
      uploadError: null
    },
    reducers: {
      setIsFilePicked: (state, action) => {
        state.isFilePicked = true;
      },

      setSelectedFile: (state, action) => {
        state.selectedFile = action.payload;
      },

      setFileContent: (state, action) => {
        state.fileContent = action.payload;
      },

    },
    extraReducers: (builder) => {
      builder
      .addCase(fileUpload.fulfilled, (state, action) => {
        state.isFilePicked = false;
      })
      .addCase(fileUpload.rejected, (state, action) => {
        state.uploadError = action.payload;
      });
    },
  });

export const { setIsFilePicked, setSelectedFile, setFileContent } = uploadSlice.actions;

export default uploadSlice.reducer;

export const selectUpload = ({ upload }) => upload;