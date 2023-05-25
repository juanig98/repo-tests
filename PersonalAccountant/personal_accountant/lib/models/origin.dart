import 'package:flutter/foundation.dart';

class Origin {
  final int id;
  final String description;
  final String key;

  Origin({
    required this.id,
    required this.description,
    required this.key,
  });

  factory Origin.fromJson(Map<String, dynamic> json) {
    return Origin(
      id: json['_id'] as int,
      description: json['description'] as String,
      key: json['key'] as String,
    );
  }
}
