import React from 'react';

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
} from 'react-native';

import {
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.screen}>
        <ScrollView contentContainerStyle={styles.content}>

          {/* BAGIAN 1: HEADER ATAS */}
          <View style={styles.topBar}>
            <Text style={styles.campusName}>
              KARTU MAHASISWA DIGITAL
            </Text>

            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>AKTIF</Text>
            </View>
          </View>

          {/* BAGIAN 2: KARTU PROFIL UTAMA */}
          <View style={styles.card}>

            {/* Foto dan biodata */}
            <View style={styles.profileRow}>
              <Image
  source={require('./assets/images/foto_saya.jpg')}
  style={styles.avatar}
  resizeMode="cover"
/>

              <View style={styles.profileInfo}>
                <Text style={styles.studentName}>
                  Tiara Ramadani Br Napitupulu
                </Text>

                <Text style={styles.studentNim}>
                  NIM: 2610033
                </Text>

                <Text style={styles.studentMajor}>
                  S1 Sistem Informasi
                </Text>
              </View>
            </View>

            {/* Garis pemisah */}
            <View style={styles.divider} />

            {/* Statistik mahasiswa */}
            <View style={styles.statsRow}>
              <View style={styles.statBox}>
                <Text style={styles.statValue}>5</Text>
                <Text style={styles.statLabel}>Semester</Text>
              </View>

              <View style={styles.statBox}>
                <Text style={styles.statValue}>3.85</Text>
                <Text style={styles.statLabel}>
                  IPK Sementara
                </Text>
              </View>

              <View style={styles.statBox}>
                <Text style={styles.statValue}>96 SKS</Text>
                <Text style={styles.statLabel}>Total SKS</Text>
              </View>
            </View>
          </View>

          {/* BAGIAN 3: JADWAL PRAKTIKUM */}
          <Text style={styles.sectionTitle}>
            Jadwal Praktikum Hari Ini
          </Text>

          <View style={styles.scheduleContainer}>

            <View style={styles.scheduleCard}>
              <Text style={styles.courseTime}>
                08:00 - 10:30 WIB
              </Text>

              <Text style={styles.courseTitle}>
                Pemrograman Mobile
              </Text>

              <Text style={styles.courseRoom}>
                Lab Komputer 2
              </Text>
            </View>

            <View style={styles.scheduleCard}>
              <Text style={styles.courseTime}>
                13:00 - 15:30 WIB
              </Text>

              <Text style={styles.courseTitle}>
                Jaringan Komputer
              </Text>

              <Text style={styles.courseRoom}>
                Lab Jaringan 1
              </Text>
            </View>

          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({

  // Wadah utama layar
  screen: {
    flex: 1,
    backgroundColor: '#F1F5F9',
  },

  content: {
    padding: 20,
    paddingBottom: 30,
  },

  // Header atas
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 8,
    gap: 8,
  },

  campusName: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E293B',
    letterSpacing: 0.5,
  },

  statusBadge: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },

  statusText: {
    color: '#15803D',
    fontSize: 12,
    fontWeight: 'bold',
  },

  // Kartu profil mahasiswa
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },

  // Foto dan biodata
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },

  avatar: {
  width: 76,
  height: 76,
  borderRadius: 38,
  backgroundColor: '#E2E8F0',
  borderWidth: 2,
  borderColor: '#2563EB',
},

  profileInfo: {
    flex: 1,
  },

  studentName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0F172A',
    marginBottom: 4,
  },

  studentNim: {
    fontSize: 14,
    color: '#475569',
    marginBottom: 4,
  },

  studentMajor: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2563EB',
  },

  // Garis pemisah
  divider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 18,
  },

  // Statistik mahasiswa
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    gap: 8,
  },

  statBox: {
    flex: 1,
    alignItems: 'center',
  },

  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0F172A',
    marginBottom: 2,
  },

  statLabel: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
  },

  // Judul jadwal praktikum
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 12,
  },

  // Daftar jadwal
  scheduleContainer: {
    flexDirection: 'row',
    gap: 12,
  },

  scheduleCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#2563EB',
  },

  courseTime: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#2563EB',
    marginBottom: 6,
  },

  courseTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0F172A',
    marginBottom: 4,
  },

  courseRoom: {
    fontSize: 12,
    color: '#64748B',
  },

});