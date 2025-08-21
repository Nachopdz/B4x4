// B4X4 v3.4 START
import React from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { useThemeB4 } from '@/ds/theme';
import { useNavigation } from '@react-navigation/native';
// B4X4 v4.6 START
import Button from '@/ds/components/Button';
import { useAuthStore } from '@/store/useAuthStore';
// B4X4 v4.6 END
// B4X4 v4.7 START
import { useSkins } from '@/pages/vault/useVault';
// B4X4 v4.7 END
// B4X4 v5.5 START
import PlayerCard from '@/components/profile/PlayerCard';
import { mapPlayerCard } from '@/utils/mappers';
import { PlayerCardDTO } from '@/types/dto';
// B4X4 v5.7 START
import { useCardCustomization } from './useCardCustomization';
// B4X4 v5.7 END

export default function ProfileScreen() {
  const theme = useThemeB4();
  const nav = useNavigation<any>();
  // B4X4 v4.6 START
  const setSessionFull = useAuthStore((s) => s.setSessionFull);
  // B4X4 v4.6 END
  // B4X4 v4.7 START
  const me = useAuthStore((s) => s.session?.user?.id ?? s.session?.userId ?? 'u1');
  const { inv } = useSkins(me);
  const equipped = inv.data?.equippedSkin;
  // B4X4 v4.7 END
  // B4X4 v4.8 START
  const roles = useAuthStore((s) => s.session?.user?.globalRoles ?? []);
  // B4X4 v4.8 END

  // B4X4 v5.5 START
  const mockCard: PlayerCardDTO = {
    id: me,
    username: 'Agente '+(me?.slice(0,4) ?? 'B4X4'),
    avatarUrl: undefined,
    city: 'Cádiz',
    team: 'Bulls Cádiz',
    role: 'player',
    stats: { rating: 86, attack: 88, defense: 80, stamina: 84, skill: 87 },
    badges: ['🏆 MVP Local', '🔥 20 Partidos'],
  };
  const playerCard = mapPlayerCard(mockCard);
  // B4X4 v5.7 START
  const { inventory } = useCardCustomization();
  const equippedSkin = (inventory.data as any)?.equippedSkin ?? equipped ?? 'default';
  const playerCardWithSkin = { ...(playerCard as any), skinId: equippedSkin };
  // B4X4 v5.7 END

  return (
    <View style={{ flex:1, backgroundColor:'#000', padding:16 }}>
      {/* B4X4 v5.5 START: Carta FIFA */}
      {/* B4X4 v5.7 START: pasar skinId */}
      <PlayerCard card={playerCardWithSkin as any} onCustomize={() => nav.navigate('CardEditor')} skinId={equippedSkin as any} />
      {/* B4X4 v5.7 END */}
      {/* B4X4 v4.7 START */}
      {equipped ? (
        <View style={{ alignItems: 'center', marginBottom: 12 }}>
          <Image source={{ uri: 'https://picsum.photos/seed/' + equipped + '/240/240' }} style={{ width: 120, height: 120, borderRadius: 60, backgroundColor: '#111' }} />
          <Text style={{ color: theme.text, marginTop: 6 }}>Skin: {equipped}</Text>
        </View>
      ) : null}
      {/* B4X4 v4.7 END */}
      <Text style={{ color: theme.text, fontSize: 22, marginBottom: 12 }}>Perfil</Text>
      <Pressable
        onPress={() => nav.navigate('EditProfile')}
        style={{ backgroundColor: theme.accent, padding: 12, borderRadius: 12, alignSelf: 'flex-start' }}
      >
        <Text style={{ color: '#000', fontWeight: '600' }}>Editar perfil</Text>
      </Pressable>
      {/* B4X4 v4.6 START */}
      <View style={{ marginTop: 16, gap: 8 }}>
        <Button title="Cerrar sesión" variant="outline" onPress={() => setSessionFull(null)} />
        {/* B4X4 v4.8 START */}
        <Button title="Seguridad y control parental" variant="outline" onPress={() => nav.navigate('SettingsSafety')} />
        {roles?.some((r) => ['owner', 'admin', 'moderator'].includes(r as any)) && (
          <Button title="Moderación (cola)" variant="outline" onPress={() => nav.navigate('ModerationQueue')} />
        )}
        {/* B4X4 v4.8 END */}
      </View>
      {/* B4X4 v4.6 END */}
    </View>
  );
}
// B4X4 v3.4 END