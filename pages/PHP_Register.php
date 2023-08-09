<?php
require_once "PHP_Config.php";

$username = $password = $confirm_password = "";
$username_err = $password_err = $confirm_password_err = "";

if ($_SERVER['REQUEST_METHOD'] == "POST") {

	// Check if username is empty
	if (empty(trim($_POST["username"]))) {
		$username_err = "Username cannot be blank";
	} else {
		$sql = "SELECT id FROM users WHERE username = ?";
		$stmt = mysqli_prepare($conn, $sql);
		if ($stmt) {
			mysqli_stmt_bind_param($stmt, "s", $param_username);

			// Set the value of param username
			$param_username = trim($_POST['username']);

			// Try to execute this statement
			if (mysqli_stmt_execute($stmt)) {
				mysqli_stmt_store_result($stmt);
				if (mysqli_stmt_num_rows($stmt) == 1) {
					$username_err = "This username is already taken";
				} else {
					$username = trim($_POST['username']);
				}
			} else {
				echo "Something went wrong";
			}
		}
	}

	mysqli_stmt_close($stmt);


	// Check for password
	if (empty(trim($_POST['password']))) {
		$password_err = "Password cannot be blank";
	} elseif (strlen(trim($_POST['password'])) < 5) {
		$password_err = "Password cannot be less than 5 characters";
	} else {
		$password = trim($_POST['password']);
	}

	// Check for confirm password field
	if (trim($_POST['password']) !=  trim($_POST['confirm_password'])) {
		$password_err = "Passwords should match";
	}


	// If there were no errors, go ahead and insert into the database
	if (empty($username_err) && empty($password_err) && empty($confirm_password_err)) {
		$sql = "INSERT INTO users (username, password) VALUES (?, ?)";
		$stmt = mysqli_prepare($conn, $sql);
		if ($stmt) {
			mysqli_stmt_bind_param($stmt, "ss", $param_username, $param_password);

			// Set these parameters
			$param_username = $username;
			$param_password = password_hash($password, PASSWORD_DEFAULT);

			// Try to execute the query
			if (mysqli_stmt_execute($stmt)) {
				header("location: PHP_Logout.php");
			} else {
				echo "Something went wrong... cannot redirect!";
			}
		}
		mysqli_stmt_close($stmt);
	}
	mysqli_close($conn);
}

?>


<!DOCTYPE html>
<html>

<head>
	<title>TransformerGo SignUp</title>
	<link rel="stylesheet" href="CSS_Main_Style.css">

	<link rel="stylesheet" href="CSS_Register_Style.css">
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
			<h2>Registration</h2>


			<form action="" method="post">
				<label for="username">Username:</label>
				<input type="text" name="username" id="username" required>
				<label for="password">Password:</label>
				<input type="password" name="password" id="password" required>
				<label for="ConfirmPassword" >Confirm Password:</label>
				<input type="Password" id="password" name="confirm_password"  required>
				<button type="submit" class="button" id="register-btn">Register</button>
				
			</form>
			<p>Already registered? <a value="ASSIGN" onclick="location.assign('PHP_Logout.php')"><button class="button" id="login_btn">Login</button></a>
			</p>
		</div>
	</div>
	
</body>

</html>