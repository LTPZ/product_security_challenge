Please read this readme file first as a small user guide.

Files added/updated:
1. index.js&index.html: removed remember me option (as it is not implemented), create account function and forget password function is working now. To use them, user just need to click the respective link.
   index.js now supports log in function. User can key in their username and password to log in their accounts. Upon successful login, user will see alert successfully logged in. If the password/username is incorrect/does not exist, the user will see an alert showing incorrect username/password.
   The lockout function is implemented. If the user tried 10 times but failed to log in one certain account, it will be locked and can only log in through resetting the password.
2. createAccount.js&createAccount.html: username, password, security quesiton and answer for resetting password is required to create a new account. If the account does not exist, the system will create a new account.
3. forget.js&forget.html: at least need to key in username and new password first. If the user know the answer to their security questions they can key in the answer as well. Otherwise the system will show the security question of the account. If user answered the question correctly, the account password will be updated. No lockout is implemented here as it is the last method to unlock the account.

What has been implemented here:
1. Input sanitization and validation: checking if there are dangerous inputs like "<"">""\""/"
2. Prevention of timing attacks: through random waiting time for each execution
3. Logging
4. Password reset / forget password mechanism
5. Account lockout: achieved by accumulating failed attempts for one account, however, in a real life system this is not realistic, because attackers can use this to lock someone else's account. This is just an idea of how to solve this problem. In real life, we need to store the number of attemps in the Cookie.
6. Known password check

