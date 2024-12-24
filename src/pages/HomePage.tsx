import { Stack, Text } from '@fluentui/react';
import PageLayout from '../components/pageLayout/PageLayout';

const HomePage = () => {
  return (
    <PageLayout>
      <Stack tokens={{ childrenGap: 20 }} styles={{ root: { padding: 20, maxWidth: 800, margin: '0 auto' } }}>
        <Text variant="xxLarge" styles={{ root: { textAlign: 'center' } }}>
          Welcome to Terror Analysis Dashboard
        </Text>
        
        <Stack tokens={{ childrenGap: 15 }} styles={{ root: { textAlign: 'justify' } }}>
          <Text variant="large">
            This platform provides comprehensive analysis of global terrorism data, offering insights through interactive visualizations and detailed mapping.
          </Text>

          <Text variant="large">
            Our dashboard enables researchers, analysts, and interested parties to explore patterns in terrorist activities, understand regional impacts, and analyze historical trends.
          </Text>

          <Text variant="large">
            Key features include:
          </Text>

          <ul style={{ fontSize: '18px', lineHeight: '1.5' }}>
            <li>Interactive maps showing regional impact of terrorist activities</li>
            <li>Temporal analysis of incident patterns and trends</li>
            <li>Group activity tracking across different regions and time periods</li>
            <li>Detailed analysis of attack types and their casualties</li>
          </ul>

          <Text variant="large">
            Use the navigation menu to explore different aspects of the analysis and gain valuable insights into global terrorism patterns.
          </Text>
        </Stack>
      </Stack>
    </PageLayout>
  );
};

export default HomePage;
