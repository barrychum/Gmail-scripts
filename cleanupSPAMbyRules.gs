function cleanupSPAMbyRules() {
    // This script checks emails with the _SpamByRules
    // if the email is read, it will be moved to _ToBeDeleted immediately
    // if the email is unread, it will be moved to _ToBeDeleted after 14 days
    // suggested frequency : daily

    // Define the label you want to target
    var oldLabel = "_SpamByRules";
    var newLabel = "_ToBeDeleted";
    var AgeInDay = 14;

    // Get the label
    var label1 = GmailApp.getUserLabelByName(oldLabel);
    var label2 = GmailApp.getUserLabelByName(newLabel);

    // Calculate the date for deletion
    var DaysAgo = new Date(new Date().getTime() - AgeInDay * 24 * 60 * 60 * 1000);

    // Iterate through each thread and message
    var threads = label1.getThreads();
    for (var i = 0; i < threads.length; i++) {
        if (!threads[i].isUnread()) {
            // Check if the thread has been read then add ToBeDeleted label
            // make sure to remove label ToBeDeleted if you need to keep the message
            threads[i].addLabel(label2);
            threads[i].removeLabel(label1);
        } else {
            var messages = threads[i].getMessages();
            for (var j = 0; j < messages.length; j++) {
                // Check if the message is older than specified age
                if (messages[j].getDate() < DaysAgo) {
                    //messages[j].moveToTrash();
                    threads[i].addLabel(label2);
                    threads[i].removeLabel(label1);
                }
            }
        }
    }
}