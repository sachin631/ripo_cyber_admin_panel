const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    const reader: any = new FileReader(); // Create a FileReader instance
    reader.onload = () => {
        // setProfilePic(reader.result); // Set the preview URL on successful read
    };
    reader.readAsDataURL(file); // Read the file as a data URL
}