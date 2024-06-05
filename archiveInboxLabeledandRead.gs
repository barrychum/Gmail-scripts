function archiveInboxLabeledandRead() {
    // This script checks all emails in inbox
    // if the email contains a user label and 
    // it is alread been read
    // the message will be archived
    // suggested frequency : daily

    // Get all threads in the inbox
    var threads = GmailApp.getInboxThreads();

    // Loop through each thread
    for (var i = 0; i < threads.length; i++) {
        var thread = threads[i];

        if (!thread.isUnread()) {
            // Get all labels for the message
            var threadLabels = thread.getLabels();

            // Check if the message has any user labels (excluding system labels)
            for (var k = 0; k < threadLabels.length; k++) {
                var label = threadLabels[k];
                if (label.getName().indexOf("system") === -1) {
                    GmailApp.moveThreadToArchive(thread);
                    break;
                }
            }
        }
    }
}
