import 'package:flutter/material.dart';

class AddPaymentMethodPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Thêm phương thức thanh toán'),
        backgroundColor: Colors.white,
        elevation: 0,
        leading: IconButton(
          icon: Icon(Icons.arrow_back, color: Colors.blue),
          onPressed: () {
            // Navigating back to the previous page (you can change this if needed)
            Navigator.pop(context);
          },
        ),
      ),
      body: ListView(
        children: [
          // Card 1: Credit card or debit card
          ListTile(
            leading: Icon(Icons.credit_card, color: Colors.blue),
            title: Text('Thêm thẻ tín dụng hoặc thẻ ghi nợ'),
            onTap: () {
              // Implement functionality for adding credit/debit card
            },
          ),
          Divider(),

          // Card 2: MoMo e-wallet
          ListTile(
            leading: Image.asset('assets/images/momo_Logo.png',
                width: 30, height: 30),
            // MoMo logo
            title: Text('Thêm MoMo e-wallet'),
            onTap: () {
              // Implement functionality for adding MoMo wallet
            },
          ),
          Divider(),

          // Card 3: VTC Pay link
          ListTile(
            leading: Icon(Icons.payment, color: Colors.blue),
            title: Text('Liên kết Ví VTC Pay'),
            onTap: () {
              // Implement functionality for linking VTC Pay
            },
          ),
          Divider(),

          // Card 4: ZaloPay e-wallet
          ListTile(
            leading:
                Image.asset('assets/images/zalopay.png', width: 30, height: 30),
            // ZaloPay logo
            title: Text('Thêm ZaloPay e-wallet'),
            onTap: () {
              // Implement functionality for adding ZaloPay wallet
            },
          ),
          Divider(),
        ],
      ),
    );
  }
}
