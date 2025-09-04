// TODO: implement server-side fetch calls
// I have no idea how to implement this so maybe ill revisit this project in idk like a couple months

const fileInput = document.querySelector(".file-input");
const downloadBtn = document.querySelector(".download-btn");

downloadBtn.addEventListener("click", () => {
    fetchData();
})

async function fetchData()
{
    try
    {
        // fetching the file link
        const response = await fetch(fileInput.value);

        // if the input field is empty
        if (!fileInput.value)
        {
            throw new Error("Please insert a file link.")
        }

        // if the fetch failed
        if (!response.ok)
        {
            throw new Error("Could not fetch resource.");
        }

        // transforming the response into a blob, that will be turned into an URL
        const file = await response.blob();
        const url = URL.createObjectURL(file);

        // temporary anchor tag containing the file download link, that will be automatically clicked and removed
        const tempAnchor = document.createElement("a");
        tempAnchor.href = url;
        URL.revokeObjectURL(url);

        // name for the downloaded file
        const date = new Date();
        const fileName = date.getTime();
        tempAnchor.download = fileName;

        document.querySelector("body").appendChild(tempAnchor);
        tempAnchor.click();
        tempAnchor.remove();
    }
    catch(error)
    {
        alert(error)
        console.error(error);
    }
}