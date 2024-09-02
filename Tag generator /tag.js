document.addEventListener('DOMContentLoaded', function() {
    const searchButton = document.getElementById('searchButton');
    const titleInput = document.getElementById('titleInput');
    const loadingDiv = document.getElementById('loading');
    const tagsDiv = document.getElementById('tags');
    const copyButton = document.getElementById('copyButton');

    if (searchButton && titleInput && loadingDiv && tagsDiv && copyButton) {
        searchButton.addEventListener('click', function() {
            const title = titleInput.value.toLowerCase();
            
            loadingDiv.classList.remove('hidden'); // Show loading
            tagsDiv.innerHTML = ''; // Clear previous tags
            copyButton.classList.add('hidden'); // Hide copy button
            
            setTimeout(() => { // Simulate loading time
                const tags = generateTags(title);
                
                if (tags.length > 0) {
                    tagsDiv.innerHTML = tags.join(', '); // Show tags
                    copyButton.classList.remove('hidden'); // Show copy button
                    copyButton.onclick = function() {
                        copyTagsToClipboard(tags);
                    };
                } else {
                    tagsDiv.innerHTML = 'No tags found.';
                }
                
                loadingDiv.classList.add('hidden'); // Hide loading
            }, 1000); // Adjust loading time as needed
        });
    }

    function generateTags(title) {
        const tagGroups = {
            gaming: ['#gaming', '#gamer', '#gaminglife', '#gameon', '#gamingcommunity'],
            tech: ['#tech', '#technology', '#innovation', '#technews', '#gadgets'],
            // Add more tag groups here
        };

        // Return tags based on the title
        for (let key in tagGroups) {
            if (title.includes(key)) {
                return tagGroups[key];
            }
        }

        return [];
    }

    function copyTagsToClipboard(tags) {
        const tagString = tags.join(', ');
        navigator.clipboard.writeText(tagString).then(() => {
            alert('Tags copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy tags: ', err);
        });
    }
});
