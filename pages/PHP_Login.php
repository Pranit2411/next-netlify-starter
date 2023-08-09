<?php
//This script will handle login
session_start();

// check if the user is already logged in
if (isset($_SESSION['username'])) {
	header("location: PHP_Index.html");
	exit;
}
require_once "PHP_Config.php";

$username = $password = "";
$err = "";

// if request method is post
if ($_SERVER['REQUEST_METHOD'] == "POST") {
	if (empty(trim($_POST['username'])) || empty(trim($_POST['password']))) {
		$err = "Please enter username + password";
	} else {
		$username = trim($_POST['username']);
		$password = trim($_POST['password']);
	}


	if (empty($err)) {
		$sql = "SELECT id, username, password FROM users WHERE username = ?";
		$stmt = mysqli_prepare($conn, $sql);
		mysqli_stmt_bind_param($stmt, "s", $param_username);
		$param_username = $username;


		// Try to execute this statement
		if (mysqli_stmt_execute($stmt)) {
			mysqli_stmt_store_result($stmt);
			if (mysqli_stmt_num_rows($stmt) == 1) {
				mysqli_stmt_bind_result($stmt, $id, $username, $hashed_password);
				if (mysqli_stmt_fetch($stmt)) {
					if (password_verify($password, $hashed_password)) {
						// this means the password is corrct. Allow user to login
						session_start();
						$_SESSION["username"] = $username;
						$_SESSION["id"] = $id;
						$_SESSION["loggedin"] = true;

						//Redirect user to welcome page
						header("location: PHP_Index.html");
					}
				}
			}
		}
	}
}


?>
<!DOCTYPE html>
<html>

<head>
	<title>TransformerGo Login </title>
	<link rel="stylesheet" href="CSS_Main_Style.css">
	<link rel="stylesheet" href="CSS_Login_Style.css">
	<link rel="icon" type="image/x-icon" href="icon.png">
</head>

<body>
	<nav class="navbar">
		<div class="navbar__container">
			<!--Anchor Tags -->
			<a value="ASSIGN" onclick="location.assign('PHP_HomePage.php')" id="navbar__logo"><Strong><em>Transformer<span1>Go</span1></em></Strong></a>
			<div class="navbar__toggle" id="mobile-menu">
				<span class="bar"></span>
				<span class="bar"></span>
				<span class="bar"></span>

			</div>

		</div>
	</nav>
	<div class="main__container">
		<div class="main__img--container">
			<div class="main__img--card">
				<div class="logo">
					<img id="LoginSignUpImage" src="LoginSignUpImage.png" alt="">
				</div>
			</div>
		</div>
		<div class="heading">
			<h2>Login</h2>

			<form action="" method="post">
				<label for="username">Username:</label>
				<input type="text" id="username" name="username" required>
				<label for="password">Password:</label>
				<input type="password" id="password" name="password" required>
				<button type="submit" class="button" id="register-btn">Login</button>
				
			</form>
		</div>
	</div>
	
</body>

</html>