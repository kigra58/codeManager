import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../theme/theme';
import { FORM_STEPS } from '../../utils/constant';
import Certificate from '../Certificate';

export default function Step2Documents() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{FORM_STEPS[1].title}</Text>

      {/* RC SECTION STARTS HERE  */}
      <Certificate title="Registration Certificate" imageFieldTitle="RC Image" isRC={true} />
      <Certificate title="Pollution Certificate" imageFieldTitle="PUC Image" isRC={false} />
      <Certificate title="Insurance Certificate" imageFieldTitle="Insurance Image" isRC={false} />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: 'bold',
    marginBottom: theme.spacing.md,
    color: theme.colors.text,
  },
});
