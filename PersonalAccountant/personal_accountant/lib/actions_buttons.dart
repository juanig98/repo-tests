import 'dart:convert';
import 'dart:developer';

import 'package:currency_text_input_formatter/currency_text_input_formatter.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:personal_accountant/models/origin.dart';
import 'package:requests/requests.dart';

class ActionsButtons extends StatefulWidget {
  const ActionsButtons({super.key});

  @override
  _ActionsButtonsState createState() => _ActionsButtonsState();
}

class _ActionsButtonsState extends State<ActionsButtons>
    with SingleTickerProviderStateMixin {
  bool isOpened = false;
  late AnimationController _animationController;
  late Animation<Color?> _buttonColor;
  late Animation<double> _animateIcon;
  late Animation<double> _translateButton;
  final Curve _curve = Curves.easeOut;
  final double _fabHeight = 56.0;
  final CurrencyTextInputFormatter _formatter = CurrencyTextInputFormatter(
    locale: 'es_AR',
    symbol: '\$ ',
  );

  Future<void> _dialogAddOutGo(BuildContext context) async {
    var url = dotenv.get('API_URL', fallback: 'API_URL not found');
    var r = await Requests.get('$url/origins');
    r.raiseForStatus();
    List<dynamic> body = jsonDecode(r.content());

    List<Origin> origins =
        body.map((dynamic item) => Origin.fromJson(item)).toList();

    print(origins);

    return showDialog<void>(
      context: context,
      builder: (BuildContext context) {
        return Dialog(
          child: Padding(
            padding: const EdgeInsets.all(8.0),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                const TextField(
                  decoration: InputDecoration(labelText: 'Descripción'),
                ),
                TextField(
                  inputFormatters: <TextInputFormatter>[_formatter],
                  keyboardType: TextInputType.number,
                  decoration: const InputDecoration(labelText: 'Monto'),
                ),
                DropdownButton(
                  isExpanded: true,
                  value: origins[0],
                  icon: const Icon(Icons.keyboard_arrow_down),
                  items: origins.map((Origin items) {
                    return DropdownMenuItem(
                      value: items,
                      child: Text(items.description),
                    );
                  }).toList(),
                  onChanged: (Origin? value) => {},
                ),
                const SizedBox(height: 15),
                TextButton(
                  onPressed: () {
                    Navigator.pop(context);
                  },
                  child: const Text('Cancelar'),
                ),
              ],
            ),
          ),
        );
      },
    );
  }

  @override
  initState() {
    _animationController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 500),
    )..addListener(() {
        setState(() {});
      });
    _animateIcon =
        Tween<double>(begin: 0.0, end: 1.0).animate(_animationController);
    _buttonColor = ColorTween(
      begin: Colors.white,
      end: Colors.red,
    ).animate(CurvedAnimation(
      parent: _animationController,
      curve: const Interval(
        0.00,
        1.00,
        curve: Curves.linear,
      ),
    ));
    _translateButton = Tween<double>(
      begin: _fabHeight,
      end: -14.0,
    ).animate(CurvedAnimation(
      parent: _animationController,
      curve: Interval(
        0.0,
        0.75,
        curve: _curve,
      ),
    ));
    super.initState();
  }

  @override
  dispose() {
    _animationController.dispose();
    super.dispose();
  }

  animate() {
    if (!isOpened) {
      _animationController.forward();
    } else {
      _animationController.reverse();
    }
    isOpened = !isOpened;
  }

  Widget addOutGo() {
    return FloatingActionButton(
      backgroundColor: Colors.white,
      onPressed: () => _dialogAddOutGo(context),
      tooltip: 'Nuevo gasto',
      child: const Icon(Icons.add_shopping_cart),
    );
  }

  Widget addDeposit() {
    return const FloatingActionButton(
      backgroundColor: Colors.white,
      onPressed: null,
      tooltip: 'Nuevo ingreso',
      child: Icon(Icons.attach_money),
    );
  }

  Widget addExchange() {
    return const FloatingActionButton(
      backgroundColor: Colors.white,
      onPressed: null,
      tooltip: 'Intercambio de capitales',
      child: Icon(Icons.currency_exchange),
    );
  }

  Widget toggle() {
    return FloatingActionButton(
      backgroundColor: _buttonColor.value,
      onPressed: animate,
      tooltip: 'Toggle',
      child: AnimatedIcon(
        icon: AnimatedIcons.menu_close,
        progress: _animateIcon,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.end,
      children: <Widget>[
        Transform(
          transform: Matrix4.translationValues(
            0.0,
            _translateButton.value * 3.0,
            0.0,
          ),
          child: addOutGo(),
        ),
        Transform(
          transform: Matrix4.translationValues(
            0.0,
            _translateButton.value * 2.0,
            0.0,
          ),
          child: addDeposit(),
        ),
        Transform(
          transform: Matrix4.translationValues(
            0.0,
            _translateButton.value,
            0.0,
          ),
          child: addExchange(),
        ),
        toggle(),
      ],
    );
  }
}
