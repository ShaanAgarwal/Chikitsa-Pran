import 'dart:convert';

import 'package:chikitsapran/modals/hospital.dart';

import 'package:flutter/material.dart';
import 'package:geolocator/geolocator.dart';
import "package:http/http.dart" as http;

import 'package:shared_preferences/shared_preferences.dart';

class HomePage extends StatefulWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  // @override
  // void initState() {
  //   // TODO: implement initState
  //   super.initState();
  // }

  final _formKey = GlobalKey<FormState>();
  late String emailidPatiet = "";
  late int _age = 0;
  late String _symptoms = "";
  String _location = '';
  late String lat = "";
  late String long = "";
  List<Hospital> hospitals = [];
  bool reset = false;
  bool isLoading = false;
  late String _hospitalname = "";
  bool ToastValue = false;

  //Map<String, List<Hospital>> hospitalData = {};

  Future<void> sendNotification() async {
    try {
      SharedPreferences prefs = await SharedPreferences.getInstance();
      final email = prefs.getString('email');
      final symptoms = prefs.getString('symptoms');
      final hospitalname = prefs.getString('hospitalname');

      // Prepare the request body
      if (email == null || symptoms == null || hospitalname == null) {
        return;
      }
      Map<String, dynamic> requestBody = {
        'email': email,
        'symptoms': symptoms,
        'hospitalname': hospitalname,
      };
      print(requestBody);

      final response = await http.post(
        Uri.parse(
            'https://0208-14-140-90-130.ngrok-free.app/api/hospital/sendNotification'),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode(requestBody),
      );

      if (response.statusCode == 200) {
        print('Notification sent successfully');
        ToastValue = true;
        if (ToastValue == true) {
          ScaffoldMessenger.of(context).showSnackBar(SnackBar(
            content: Text('Notification sent successfully'),
          ));
        }
        // Handle successful response
      } else {
        print('Failed to send notification: ${response.reasonPhrase}');
        // Handle error response
      }
    } catch (e) {
      print('Error sending notification: $e');
      // Handle exceptions
    }
  }

  Future<void> savedData(
      String email, String symptoms, String hospitalname) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    prefs.setString("email", email);
    prefs.setString("symptoms", symptoms);
    prefs.setString("hospitalname", hospitalname);
  }

  Future<Position> submitForm() async {
    bool isServiceEnabled = await Geolocator.isLocationServiceEnabled();
    if (!isServiceEnabled) {
      return Future.error('Location services are disabled.');
    }
    LocationPermission permission = await Geolocator.checkPermission();
    if (permission == LocationPermission.denied) {
      permission = await Geolocator.requestPermission();
      if (permission == LocationPermission.denied) {
        return Future.error('Location permission is denied');
      }
    }
    if (permission == LocationPermission.deniedForever) {
      return Future.error('Location permission is denied forever');
    }
    if (_formKey.currentState!.validate()) {
      _formKey.currentState!.save();
      try {
        Position position = await Geolocator.getCurrentPosition(
          desiredAccuracy: LocationAccuracy.high,
        );
        setState(() {
          isLoading = true;
        });

        final response = await http.get(
          Uri.parse(
            'https://0208-14-140-90-130.ngrok-free.app/api/hospital/getHospitals?latitude=${position.latitude}&longitude=${position.longitude}&disease=$_symptoms',
          ),
          headers: <String, String>{
            'Content-Type': 'application/json; charset=UTF-8',
          },
        );

        if (response.statusCode == 200) {
          List<dynamic> hospitalData = jsonDecode(response.body)['hospitals'];
          List<Hospital> fetchedHospitals = hospitalData
              .map((hospitalJson) => Hospital.fromJson(hospitalJson))
              .toList();

          setState(() {
            hospitals = fetchedHospitals;
          });
          print("Success");
          print(response.body);
        } else {
          print("Failed");
        }
      } catch (e) {
        print("Error: $e");
      }
    }
    setState(() {
      isLoading = false;
    });
    return await Geolocator.getCurrentPosition();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Form(
            key: _formKey,
            child: isLoading
                ? Center(child: CircularProgressIndicator())
                : hospitals.isEmpty && reset == true
                    ? Column(
                        children: [
                          TextFormField(
                            decoration: const InputDecoration(
                              labelText: "EMAIL ID",
                              hintText: "Enter EMAIL ID",
                            ),
                            validator: (value) {
                              if (value == null || value.isEmpty) {
                                return "Please enter Email ID";
                              }
                              return null;
                            },
                            onSaved: (value) {
                              emailidPatiet = value!;
                            },
                          ),
                          SizedBox(
                            height: 20,
                          ),

                          SizedBox(
                            height: 20,
                          ),
                          TextFormField(
                            decoration: const InputDecoration(
                              labelText: "Symptoms of the Patient",
                              hintText: "Enter Symptoms",
                            ),
                            maxLines: 3,
                            validator: (value) {
                              if (value == null || value.isEmpty) {
                                return "Please enter Symptoms";
                              }
                              return null;
                            },
                            onSaved: (value) {
                              _symptoms = value!;
                            },
                          ),
                          SizedBox(
                            height: 20,
                          ),
                          ElevatedButton(
                            onPressed: () {
                              submitForm().then((value) {
                                lat = (value.latitude).toString();
                                long = (value.longitude).toString();
                                setState(() {
                                  _location =
                                      "Latitude: $lat, Longitude: $long";
                                  _symptoms = _symptoms;
                                });
                                print(_location);
                              });
                            },
                            child: Text("Submit"),
                          ),
                          SizedBox(
                            height: 20,
                          ),
                          // Display the list of hospitals
                        ],
                      )
                    : Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Center(
                              child: ElevatedButton(
                                  onPressed: () {
                                    reset = true;
                                    setState(() {
                                      hospitals = [];
                                    });
                                  },
                                  child: Text("Reset"))),
                          Text(
                            'List of Hospitals:',
                            style: TextStyle(
                              fontSize: 24,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          SizedBox(height: 16),
                          ListView.builder(
                            shrinkWrap: true,
                            itemCount: hospitals.length,
                            itemBuilder: (context, index) {
                              return GestureDetector(
                                onTap: () {
                                  setState(() {
                                    _hospitalname = hospitals[index].name;
                                    savedData(emailidPatiet, _symptoms,
                                        _hospitalname);
                                    sendNotification();
                                  });

                                  //  Navigator.pushNamed(context, MyRoutes.hospital);
                                },
                                child: Card(
                                  elevation: 2,
                                  margin: EdgeInsets.symmetric(vertical: 8),
                                  child: ListTile(
                                    leading: hospitals[index].profilepic != null
                                        ? Image.network(
                                            hospitals[index].profilepic!,
                                            width: 100,
                                            height: 100,
                                            fit: BoxFit.cover,
                                          )
                                        : SizedBox(),
                                    title: Text(
                                      hospitals[index].name,
                                      style: TextStyle(
                                          fontWeight: FontWeight.bold,
                                          color: Colors.red),
                                    ),
                                    subtitle: Text(
                                      "Hospital: " +
                                          hospitals[index]
                                              .phoneNumber
                                              .toString() +
                                          "\nAmbulance:" +
                                          hospitals[index]
                                              .ambulanceNumber
                                              .toString(),
                                      style: TextStyle(
                                          fontWeight: FontWeight.bold),
                                    ),
                                  ),
                                ),
                              );
                            },
                          ),
                        ],
                      ),
          ),
        ),
      ),
      appBar: AppBar(
        title: Text(
          "Find Emergency Services!",
        ),
        backgroundColor: Colors.red,
      ),
    );
  }
}
