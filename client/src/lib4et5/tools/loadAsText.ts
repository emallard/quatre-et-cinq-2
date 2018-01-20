
export function loadAsText(file:File) :Promise<string>{

  return new Promise((resolve, reject) => {

    var reader = new FileReader();
    reader.onload = (event) => {
      resolve(reader.result);
    }
    reader.onerror = reject;
    reader.readAsText(file);
  });
}