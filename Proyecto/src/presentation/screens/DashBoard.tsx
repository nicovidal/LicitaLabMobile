import { View } from "react-native";
import { DashBoardCard } from "../components/DashBoardCard";
import { Text } from "react-native-paper";
import { useAuthStore } from "../../store/auth/loginAuthStore";


export const DashBoard = () => {
    const { user } = useAuthStore(); 

    return (
        <View>
            <Text variant="displayMedium">
                DashBoard {user?.name && `- ${user.name}`}
            </Text>
            
            <View style={{ marginLeft: 100, marginTop: 150 }}>
                <DashBoardCard />
            </View>

            <View style={{ flexDirection: 'row', marginTop: 20, width: '70%', marginLeft: 30 }}>
                <DashBoardCard />
                <DashBoardCard />
            </View>
        </View>
    );
}
