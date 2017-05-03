package com.example.yacovfleischmann.contact;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import java.util.ArrayList;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Button theButton = (Button)findViewById(R.id.button2);
        final EditText editText = (EditText)findViewById(R.id.editText2);
        ArrayList<String> contacts = new ArrayList<String>();
            contacts.add("Donald Trump");
            contacts.add("Mike Pence");
            contacts.add("Warren Buffet");
            contacts.add("Jared Kushner");
            contacts.add("Ivanka Kushner");
            contacts.add("Hillary Clinton");
            contacts.add("Donald Trump");
            contacts.add("Mike Pence");
            contacts.add("Warren Buffet");


        ListView contactsListView = (ListView)findViewById(R.id.contactsListView);
        //ArrayAdapter<String> adapter = new ArrayAdapter<String>(this, android.R.layout.simple_list_item_1, contacts);
        final ArrayAdapter<String> adapter = new ArrayAdapter<String>(this, R.layout.contact_list_item, R.id.contactNameTextView, contacts);
        theButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                try{
                    adapter.add(editText.getText().toString());
                    Log.i("MyMessage", "You clicked the submit button");
                } catch(NumberFormatException e){
                    Log.i("MyMessage", "an error occured at" + e.getMessage());
                }
            }
        });
        contactsListView.setAdapter(adapter);
    }
}
