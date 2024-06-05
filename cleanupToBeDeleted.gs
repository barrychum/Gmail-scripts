function cleanupToBeDeleted() {
    // This script checks all emails with label _ToBeDeleted
    // if the message is older than 60 days, the message will be moved to trash
    // suggested frequency : daily

    // Define variables
    var labelName = "_ToBeDeleted";
    var AgeInDay = 60;

    // Get the label
    var label = GmailApp.getUserLabelByName(labelName);

    // Get threads with the label
    var threads = label.getThreads();

    // Calculate the date for deletion
    var DaysAgo = new Date(new Date().getTime() - AgeInDay * 24 * 60 * 60 * 1000);

    // Iterate through each thread
    for (var i = 0; i < threads.length; i++) {
        // Get the messages in the thread
        var messages = threads[i].getMessages();

        // Iterate through each message
        for (var j = 0; j < messages.length; j++) {
            // Get the date of the message
            var messageDate = messages[j].getDate();

            // Check if the message is older than specified age
            if (messageDate < DaysAgo) {
                // Delete the message
                messages[j].moveToTrash();
            }
        }
    }
}