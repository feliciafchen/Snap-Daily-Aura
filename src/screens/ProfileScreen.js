import { Image , Text, View} from "react-native";

export default function ProfileScreen(){
return(
    <View styles={{alignItems:"center"}}>
    <Image 
    source={{uri:"https://loremflickr.com/cache/resized/65535_52294428543_2d04971c12_n_320_240_nofilter.jpg"}}
    style={{width: 400, height: 400, borderRadius: 400/ 2}} 
    />
    <Text 
        styles={{justifyContents:"center"}}>
        BLAH BLAH NAME
    </Text>
    </View>
);
};