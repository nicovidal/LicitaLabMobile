import { useEffect } from 'react';
import { DashBoardCard } from '../components/DashBoardCard';

import { useAuthStore } from '../../store/auth/loginAuthStore';
import { useFollowStore } from '../../store/follow/useFollowStore';
import { Text } from 'react-native-paper';
import { View } from 'react-native';

export const DashBoard = () => {
  const { user } = useAuthStore();
  const { total, agileCount, tenderCount, fetchFollowedOpportunities } = useFollowStore();

  useEffect(() => {
    fetchFollowedOpportunities(true);  // Cargar oportunidades al entrar al dashboard
  }, []);

  const userName = user?.name;

  return (
    <View>
      <Text variant="displayMedium">DashBoard</Text>
      {userName && <Text>BUENAS TARDES {userName}!</Text>}

      <View style={{ marginLeft: 100, marginTop: 150 }}>
        <DashBoardCard title="Total en seguimiento" count={total} />
      </View>

      <View style={{ flexDirection: 'row', marginTop: 20, width: '70%', marginLeft: 30 }}>
        <DashBoardCard title="Oportunidades Agile" count={agileCount} />
        <DashBoardCard title="Oportunidades Tender" count={tenderCount} />
      </View>
    </View>
  );
};
