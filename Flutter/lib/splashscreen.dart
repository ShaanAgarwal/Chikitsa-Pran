import 'package:chikitsapran/homepage.dart';
import 'package:chikitsapran/utlis/myroutes.dart';
import 'package:flutter/material.dart';

class SplashScreen extends StatefulWidget {
  const SplashScreen({Key? key}) : super(key: key);

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {
  @override
  void initState() {
    super.initState();
    navigateToNextScreen(context); // Pass context to navigate method
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Image.asset("assets/images/plus.png", width: 200, height: 200),
      ),
    );
  }

  Future<void> navigateToNextScreen(BuildContext context) async {
    // Simulate some loading time before navigating to the next screen
    await Future.delayed(Duration(seconds: 3));
    // Navigate to the next screen
    Navigator.pushReplacement(
        context, MaterialPageRoute(builder: (context) => HomePage()));
  }
}
