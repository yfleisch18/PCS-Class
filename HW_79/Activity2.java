package com.example.yacovfleischmann.multiple;

/**
 * Created by Yacov Fleischmann on 5/7/2017.
 */


import android.support.v7.app.AppCompatActivity;
        import android.os.Bundle;
        import android.widget.TextView;

public class Activity2 extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main2);

        Bundle bundle = getIntent().getExtras();
        if (bundle == null) {
            return;
        }
        String theText = (String)bundle.getSerializable("myText");

        TextView textResult = (TextView)findViewById(R.id.textResult);
        textResult.setText(theText);
    }
}