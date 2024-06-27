class Hospital {
  final String name;
  final Map<String, double> location;
  String? profilepic;
  int? phoneNumber;
  int? ambulanceNumber;

  Hospital(
      {required this.name,
      required this.location,
      required this.profilepic,
      required this.phoneNumber,
      this.ambulanceNumber});

  factory Hospital.fromJson(Map<String, dynamic> json) {
    return Hospital(
      name: json['name'],
      location: Map<String, double>.from(json['location']),
      profilepic: json['profilePic'],
      phoneNumber: json['phoneNumber'],
      ambulanceNumber: json['ambulancePhoneNumber'],
    );
  }
}
