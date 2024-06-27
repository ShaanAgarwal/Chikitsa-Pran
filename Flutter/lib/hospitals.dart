// import 'dart:convert';

// import 'package:chikitsapran/homepage.dart';
// import 'package:flutter/material.dart';
// import 'package:shared_preferences/shared_preferences.dart';

// class Hospitals extends StatefulWidget {
//   const Hospitals({Key? key}) : super(key: key);

//   @override
//   State<Hospitals> createState() => _HospitalsState();
// }

// class _HospitalsState extends State<Hospitals> {
//   // late List<Hospital> hospitals = [];

//   // @override
//   // void initState() {
//   //   super.initState();
//   //   _loadHospitalData();
//   // }

//   // Future<void> _loadHospitalData() async {
//   //   SharedPreferences prefs = await SharedPreferences.getInstance();
//   //   String? jsonData = prefs.getString('hospitalData');

//   //   if (jsonData != null) {
//   //     List<dynamic> parsedJson = jsonDecode(jsonData);
//   //     List<Hospital> loadedHospitals = parsedJson.map((e) {
//   //       return Hospital(
//   //         name: json.toString(),
//   //         location: json.toString(),
//   //         //  equipmentAvailable: List<String>.from(json['equipmentAvailable']),
//   //       );
//   //     }).toList();

//   //     setState(() {
//   //       hospitals = loadedHospitals;
//   //     });
//   //   }
//   // }

//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//       appBar: AppBar(
//         title: Text('Hospitals'),
//       ),
//       body: Padding(
//         padding: const EdgeInsets.all(16.0),
//         child: Column(
//           crossAxisAlignment: CrossAxisAlignment.start,
//           children: [
//             Text(
//               'List of Hospitals:',
//               style: TextStyle(
//                 fontSize: 24,
//                 fontWeight: FontWeight.bold,
//               ),
//             ),
//             SizedBox(height: 16),
//             Expanded(
//               child: ListView.builder(
//                 itemCount: ,
//                 itemBuilder: (context, index) {
//                   return Card(
//                     elevation: 2,
//                     margin: EdgeInsets.symmetric(vertical: 8),
//                     child: ListTile(
//                       title: Text(
//                         hospitals[index].name,
//                         style: TextStyle(fontWeight: FontWeight.bold),
//                       ),
//                       subtitle: Text(hospitals[index].location),
//                     ),
//                   );
//                 },
//               ),
//             ),
//           ],
//         ),
//       ),
//     );
//   }
// }

// class Hospital {
//   final String name;
//   final String location;
//   //final List<String> equipmentAvailable;

//   Hospital({
//     required this.name,
//     required this.location,
//     //  required this.equipmentAvailable,
//   });
// }
