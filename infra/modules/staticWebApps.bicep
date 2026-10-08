param location string
param staticWebAppsName string
param commonTags object
param skuName string = 'Free'
param skuTier string = 'Free'

// Create Static Web App resource
resource staticWebApp 'Microsoft.Web/staticSites@2025-05-01' = {
  name: staticWebAppsName
  location: location
  sku: {
    name: skuName
    tier: skuTier
  }
  tags: commonTags
  properties: {
    provider: 'GitHub'
    enterpriseGradeCdnStatus: 'Disabled'
    allowConfigFileUpdates: true
  }
}

// Outputs
output id string = staticWebApp.id
output name string = staticWebApp.name
output defaultHostname string = staticWebApp.properties.defaultHostname
output location string = staticWebApp.location
