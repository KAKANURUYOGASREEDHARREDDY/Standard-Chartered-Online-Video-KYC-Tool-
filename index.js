document.addEventListener("DOMContentLoaded", function() {
    const video = document.getElementById('live-video');
    const canvas = document.getElementById('live-photo-canvas');
    const captureButton = document.getElementById('capture-btn');
    const nameInput = document.getElementById('name');
    const dobInput = document.getElementById('dob');
    const addressInput = document.getElementById('address');
    const panAadhaarInput = document.getElementById('pan-aadhaar');
    const signatureInput = document.getElementById('signature');
    const incomeRangeInput = document.getElementById('income-range');
    const employmentTypeInput = document.getElementById('employment-type');

    let stream;
    let context = canvas.getContext('2d');

    // Start the video stream
    navigator.mediaDevices.getUserMedia({
            video: true
        })
        .then(function(mediaStream) {
            stream = mediaStream;
            video.srcObject = mediaStream;
            video.onloadedmetadata = function(e) {
                video.play();
            };
        })
        .catch(function(err) {
            console.error('Error accessing camera: ', err);
        });

    // Capture photo from video stream
    captureButton.addEventListener('click', function() {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        // Simulate autofill from QR code data
        simulateAutofill();
    });

    // Simulate autofill from QR code data
    function simulateAutofill() {
        // Simulated QR code data containing user details
        const qrCodeData = {
            name: "John Doe",
            dob: "1990-01-01",
            address: "123 Main St, Anytown",
            panAadhaar: "ABCDE1234F",
            signature: "JohnDoeSignature",
            incomeRange: "$50,000 - $75,000",
            employmentType: "Salaried"
        };

        // Autofill form fields with QR code data
        nameInput.value = qrCodeData.name;
        dobInput.value = qrCodeData.dob;
        addressInput.value = qrCodeData.address;
        panAadhaarInput.value = qrCodeData.panAadhaar;
        signatureInput.value = qrCodeData.signature;
        incomeRangeInput.value = qrCodeData.incomeRange;
        employmentTypeInput.value = qrCodeData.employmentType;
    }

    // Handle form submission
    const kycForm = document.getElementById('kyc-form');
    kycForm.addEventListener('submit', function(event) {
        event.preventDefault();
        // Access the captured image data from the canvas here
        const imageData = canvas.toDataURL(); // Get image data
        let formData = new FormData(kycForm);
        formData.append('image', imageData); // Append image data to form data
        // Then submit the form data to the server
        // Example:
        // fetch('your-server-endpoint', {
        //     method: 'POST',
        //     body: formData
        // })
        // .then(response => response.json())
        // .then(data => {
        //     console.log('Success:', data);
        // })
        // .catch((error) => {
        //     console.error('Error:', error);
        // });
    });
});

























// Add event listener to the proceed button

// Add event listener to the selfie input
document.getElementById("selfie-input").addEventListener("change", function() {
    // Get the selected file
    const file = this.files[0];
    // Check if a file is selected
    if (file) {
        // Create a FileReader object
        const reader = new FileReader();
        // Set the onload event handler
        reader.onload = function(event) {
            // Set the preview image source
            document.getElementById("selfie-preview").src = event.target.result;
            // Show the preview image
            document.getElementById("selfie-preview").classList.remove("hidden");
            // Show the buttons to proceed or retake
            document.getElementById("proceed-btn-selfie").classList.remove("hidden");
            document.getElementById("retake-btn").classList.remove("hidden");
        };
        // Read the file as a data URL
        reader.readAsDataURL(file);
    }
});

// Add event listener to the proceed button in selfie module
document.getElementById("proceed-btn-selfie").addEventListener("click", function() {
    // Hide the selfie module
    document.getElementById("section2").classList.add("hidden");
    // Show the government ID module
    document.getElementById("section3").classList.remove("hidden");
});

// Add event listener to the retake button
document.getElementById("retake-btn").addEventListener("click", function() {
    // Clear the selfie input
    document.getElementById("selfie-input").value = "";
    // Hide the preview image
    document.getElementById("selfie-preview").classList.add("hidden");
    // Hide the buttons to proceed or retake
    document.getElementById("proceed-btn-selfie").classList.add("hidden");
    document.getElementById("retake-btn").classList.add("hidden");

});
