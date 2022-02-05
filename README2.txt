INSTRUCTIONS IN ACCESSING THE ACTUAL DATABASES OF MONGODB

1) NOTE: Most instructions for MacOS use homebrew to download and install, but seems like this method is no longer supported
2) Since HomeBrew no longer works, proceed to downloading the .zip file from
    a) I downloaded Version 1.1.9 / MacOS 64-bit
    b) Following helpful links:
        i) https://docs.mongodb.com/mongodb-shell/install/
        ii) https://www.mongodb.com/try/download/shell
3) The downloaded files currently live in my Download folders
4) To execute mongosh, navigate to: /Users/rod/Downloads/mongosh-1.1.9-darwin-x64/bin and run the following;
    a) ./mongosh
5) To connect to your database run the following command:
    a)  ./mongosh "mongodb+srv://mongodbMaster:mongodb115@cluster0.iasnm.mongodb.net/myFirstDatabase"
    b) NOTE: How this command has the username:password within the command.
