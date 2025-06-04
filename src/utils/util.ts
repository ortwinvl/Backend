import fileUpload from "express-fileupload";

/**
 * @method isEmpty
 * @param {String | Number | Object} value
 * @returns {Boolean} true & false
 * @description this value is Empty Check
 */
export const isEmpty = (value: string | number | object): boolean => {
  if (value === null) {
    return true;
  } else if (typeof value !== 'number' && value === '') {
    return true;
  } else if (typeof value === 'undefined' || value === undefined) {
    return true;
  } else if (value !== null && typeof value === 'object' && !Object.keys(value).length) {
    return true;
  } else {
    return false;
  }
};

 //
 // Summary:
 //     Removes characters of specified types.
 //
 // Parameters:
 //   source:
 //     The string to remove from.
 //
 //   removeTypes:
 //     A string containing 'L' to remove letters, 'D' to remove digits and 'S' to remove
 //     symbols.
 //
 // Returns:
 //     A string containing the remaining characters.
export const strip = (value:string, removetypes: string) : string | null => {
  const regex = /^[a-zA-Z]+$/;
  const regexNumeric = /^[0-9]+$/;
  let result = "" ;
  if (!value) return null;
  if (!removetypes) return value;

  [...value].forEach(c => {
    if ( regex.test(c)) //isLetter
    {
      if (!removetypes.includes("L")) 
        result += c;
    }
    else {
      if (regexNumeric.test(c)) //isnumber
      {
        if (!removetypes.includes("D")) 
          result += c;
      }
      else {
        if (!removetypes.includes("S")) 
          result += c;
      }
    }
});
  return result;
}

/**
 * @method bool
 * @param {String | Number | Object} v
 * @returns {Boolean} true & false
 * @description convert v to boolean
 */
export const bool = (v) => { return v==="false" || v==="null" || v==="NaN" || v==="undefined" || v==="0" ? false : !!v; };

//Check if upload is a single file or multiple files
export const isSingleFile = (file: fileUpload.UploadedFile | fileUpload.UploadedFile[]): file is fileUpload.UploadedFile  => {
  return typeof file === "object" && (file as fileUpload.UploadedFile).name !== undefined;
}

export const isFileArray = (file: fileUpload.UploadedFile | fileUpload.UploadedFile[]): file is fileUpload.UploadedFile[] => {
  return Array.isArray(file);
}