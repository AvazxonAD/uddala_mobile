import 'package:flutter/material.dart';

class CategoryVisual {
  const CategoryVisual({required this.emoji, required this.color});

  final String emoji;
  final Color color;
}

const _defaultVisual = CategoryVisual(emoji: '🔧', color: Color(0xFF1BA9F5));

const _visualsByKeyword = <String, CategoryVisual>{
  'santex': CategoryVisual(emoji: '💧', color: Color(0xFF1BA9F5)),
  'plumb': CategoryVisual(emoji: '💧', color: Color(0xFF1BA9F5)),
  'suv': CategoryVisual(emoji: '💧', color: Color(0xFF1BA9F5)),
  'elektr': CategoryVisual(emoji: '⚡', color: Color(0xFFF5B700)),
  'electric': CategoryVisual(emoji: '⚡', color: Color(0xFFF5B700)),
  'toza': CategoryVisual(emoji: '🧼', color: Color(0xFF16B378)),
  'clean': CategoryVisual(emoji: '🧼', color: Color(0xFF16B378)),
  'ta\'mir': CategoryVisual(emoji: '🔧', color: Color(0xFFB23CE0)),
  'tamir': CategoryVisual(emoji: '🔧', color: Color(0xFFB23CE0)),
  'repair': CategoryVisual(emoji: '🔧', color: Color(0xFFB23CE0)),
  'ko\'ch': CategoryVisual(emoji: '📦', color: Color(0xFFF57C1B)),
  'kochirish': CategoryVisual(emoji: '📦', color: Color(0xFFF57C1B)),
  'moving': CategoryVisual(emoji: '📦', color: Color(0xFFF57C1B)),
  'konditsi': CategoryVisual(emoji: '❄️', color: Color(0xFF06B6D4)),
  'kond': CategoryVisual(emoji: '❄️', color: Color(0xFF06B6D4)),
  'sovit': CategoryVisual(emoji: '❄️', color: Color(0xFF06B6D4)),
  'mebel': CategoryVisual(emoji: '🪑', color: Color(0xFF8B5CF6)),
  'furniture': CategoryVisual(emoji: '🪑', color: Color(0xFF8B5CF6)),
  'go\'zal': CategoryVisual(emoji: '✂️', color: Color(0xFFEC4899)),
  'soch': CategoryVisual(emoji: '✂️', color: Color(0xFFEC4899)),
  'beauty': CategoryVisual(emoji: '✂️', color: Color(0xFFEC4899)),
  'quri': CategoryVisual(emoji: '🏗️', color: Color(0xFF64748B)),
  'bog\'': CategoryVisual(emoji: '🌿', color: Color(0xFF22C55E)),
  'bog': CategoryVisual(emoji: '🌿', color: Color(0xFF22C55E)),
  'dars': CategoryVisual(emoji: '📚', color: Color(0xFF0EA5E9)),
  'repetitor': CategoryVisual(emoji: '📚', color: Color(0xFF0EA5E9)),
};

CategoryVisual visualFor(String name) {
  final lower = name.toLowerCase();
  for (final entry in _visualsByKeyword.entries) {
    if (lower.contains(entry.key)) return entry.value;
  }
  return _defaultVisual;
}
