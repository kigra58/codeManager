import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../theme/theme';
import { certificates, FORM_STEPS } from '../../utils/constant';
import Certificate from '../Certificate';

export default function Step2Documents() {
  const [activeAccordion, setActiveAccordion] = useState<number>(0);

  // Certificate data
  const toggleAccordion = (index: number) => {
    setActiveAccordion(activeAccordion === index ? -1 : index);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{FORM_STEPS[1].title}</Text>

      {/* Certificate Accordion Sections */}
      {certificates && certificates.length && certificates.map((cert, index) => (
        <View key={index} style={styles.accordionContainer}>
          <TouchableOpacity 
            style={styles.accordionHeader} 
            onPress={() => toggleAccordion(index)}
            activeOpacity={0.7}
          >
            <Text style={styles.accordionTitle}>{cert.title}</Text>
            <Text style={styles.accordionIcon}>
              {activeAccordion === index ? '▲' : '▼'}
            </Text>
          </TouchableOpacity>
          
          {activeAccordion === index && (
            <View style={styles.accordionContent}>
              <Certificate 
                imageFieldTitle={cert.imageFieldTitle} 
                isRC={cert.isRC}
                fieldPrefix={cert.prefix}
              />
            </View>
          )}
        </View>
      ))}
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
  accordionContainer: {
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.md,
    overflow: 'hidden',
  },
  accordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.md,
    backgroundColor: theme.colors.light,
  },
  accordionTitle: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  accordionIcon: {
    fontSize: 18,
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
  accordionContent: {
    padding: theme.spacing.md,
    backgroundColor: theme.colors.white,
  },
});
