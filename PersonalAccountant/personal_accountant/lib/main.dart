import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:personal_accountant/actions_buttons.dart';
import 'package:personal_accountant/nav_drawer.dart';

Future<void> main() async {
  await dotenv.load();

  runApp(const PersonalAccountantMain());
}

Map<int, Color> _darkBlue = {
  50: const Color.fromRGBO(5, 12, 50, .1),
  100: const Color.fromRGBO(5, 12, 50, .2),
  200: const Color.fromRGBO(5, 12, 50, .3),
  300: const Color.fromRGBO(5, 12, 50, .4),
  400: const Color.fromRGBO(5, 12, 50, .5),
  500: const Color.fromRGBO(5, 12, 50, .6),
  600: const Color.fromRGBO(5, 12, 50, .7),
  700: const Color.fromRGBO(5, 12, 50, .8),
  800: const Color.fromRGBO(5, 12, 50, .9),
  900: const Color.fromRGBO(5, 12, 50, 1),
};

MaterialColor darkBlue = MaterialColor(0xFF050c32, _darkBlue);

class PersonalAccountantMain extends StatelessWidget {
  const PersonalAccountantMain({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Contador personal',
      theme: ThemeData(
        primarySwatch: darkBlue,
      ),
      darkTheme: ThemeData(
        brightness: Brightness.dark,
        primarySwatch: darkBlue,
        appBarTheme: AppBarTheme(color: darkBlue),
      ),
      themeMode: ThemeMode.dark,
      debugShowCheckedModeBanner: false,
      home: const HomePage(title: 'Contador personal'),
    );
  }
}

class HomePage extends StatefulWidget {
  const HomePage({super.key, required this.title});

  final String title;

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        centerTitle: true,
        title: Text(widget.title),
      ),
      drawer: const Drawer(
        child: NavDrawer(),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Row(
              children: [],
            ),
          ],
        ),
      ),
      floatingActionButton: const ActionsButtons(),
    );
  }
}
