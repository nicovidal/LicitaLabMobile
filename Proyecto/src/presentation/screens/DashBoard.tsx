import { View } from "react-native";
import { DashBoardCard } from "../components/DashBoardCard";
import { Text } from "react-native-paper";

export const DashBoard = () => {
    return (
        <View>
            <Text variant="displayMedium">DashBoard</Text>
            
            <View style={{ marginLeft: 100, marginTop: 150 }}>
                <DashBoardCard />
            </View>

            <View style={{ flexDirection: 'row', marginTop: 20,width:'70%',marginLeft:30}}>
                <DashBoardCard />
                <DashBoardCard />
            </View>
        </View>
    );
}
