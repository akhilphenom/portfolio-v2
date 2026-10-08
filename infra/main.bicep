targetScope = 'subscription'

// Parameters
param environmentName string
param location string
param sessionId string
param deployedBy string
param createdAt string
param deployerObjectId string

// Standard tags
var commonTags = {
  'app-onboard-skill': 'true'
  'app-onboard-session-id': sessionId
  'created-at': createdAt
  environment: environmentName
  'deployed-by': deployedBy
}

// Resource naming from prepare-plan.json
var resourceGroupName = 'rg-portfolio-v2-prod-71b4'
var staticWebAppsName = 'swa-portfolio-v2-prod-71b4'

// Create resource group
resource resourceGroup 'Microsoft.Resources/resourceGroups@2021-04-01' = {
  name: resourceGroupName
  location: location
  tags: commonTags
}

// Deploy Static Web Apps module
module staticWebApp 'modules/staticWebApps.bicep' = {
  scope: resourceGroup
  name: 'swa-deployment'
  params: {
    location: location
    staticWebAppsName: staticWebAppsName
    commonTags: commonTags
    skuName: 'Free'
    skuTier: 'Free'
  }
}

// Outputs
output staticWebAppId string = staticWebApp.outputs.id
output staticWebAppDefaultHostname string = staticWebApp.outputs.defaultHostname
output staticWebAppUrl string = 'https://${staticWebApp.outputs.defaultHostname}'
output resourceGroupId string = resourceGroup.id
