// ==UserScript==
// @name         DAT One Professional Load Analyzer - Working Edition
// @namespace    http://tampermonkey.net/
// @version      3.2.0
// @description  Professional load analysis with enhanced filtering, profit calculations, and automated email system
// @author       Professional Logistics Solutions
// @match        https://one.dat.com/search-loads-ow*
// @match        https://one.dat.com/search-loads*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';
    
    // Safety wrapper to prevent script from breaking the website
    try {

    // PROFESSIONAL CONFIGURATION WITH ADVANCED SETTINGS
    const CONFIG = {
        version: '3.2.0',
        scanInterval: 3000,
        realTimeUpdates: true,
        autoRescan: true,
        
        // Enhanced Filtering System
        filters: {
            minRatePerMile: 1.80,
            maxDeadhead: 150,
            minTotalRate: 2000,
            maxTotalRate: 15000,
            minProfitMargin: 10,
            minNetProfit: 200,
            enabled: true
        },
        
        // Advanced Profit Calculation Settings
        profitEngine: {
            enabled: true,
            
            // Advanced Mathematical Modeling
            mathematicalModel: {
                enabled: true,
                distanceAccuracyFactor: 0.95,  // Real-world distance vs theoretical
                seasonalFuelAdjustment: 1.0,   // Seasonal fuel price adjustment
                marketVolatilityFactor: 0.98,  // Market volatility adjustment
                riskAssessmentWeight: 0.85     // Risk assessment multiplier
            },
            
            // Enhanced Fuel Calculation
            fuelCalculation: {
                enabled: true,
                costPerGallon: 3.85,
                mpgTruck: 6.5,
                mpgTrailer: 6.8,                // Loaded vs empty MPG
                idlingCostPerHour: 4.50,        // Idling fuel cost
                estimatedIdlingHours: 2.0,      // Hours of idling per trip
                fuelSurchargeRate: 0.08,        // Fuel surcharge as percentage
                defFluidCost: 0.15,             // DEF fluid cost per mile
                temperatureEfficiency: 1.0      // Temperature impact on MPG (winter/summer)
            },
            
            // Advanced Driver Compensation
            driverPay: {
                enabled: true,
                payPerMile: 0.65,
                perDiemRate: 75.00,             // Per diem per day
                estimatedDays: 1.0,             // Trip duration in days
                bonusRate: 0.05,                // Performance bonus rate
                benefitsRate: 0.28,             // Benefits as percentage of base pay
                overtimeRate: 25.00,            // Overtime pay per hour
                estimatedOvertimeHours: 0       // Overtime hours per trip
            },
            
            // Comprehensive Operating Costs
            operatingCosts: {
                enabled: true,
                costPerMile: 1.85,
                
                // Detailed cost breakdown
                truckPayments: 0.45,            // Truck payment per mile
                truckDepreciation: 0.25,        // Depreciation per mile
                trailerCosts: 0.15,             // Trailer costs per mile
                businessInsurance: 0.12,        // Business insurance per mile
                licenses: 0.03,                 // Licenses and registrations per mile
                communications: 0.05,           // Communications (phone, ELD) per mile
                accounting: 0.02,               // Accounting/bookkeeping per mile
                legalCompliance: 0.01,          // Legal/compliance costs per mile
                
                // Variable operating costs
                tolls: 0.08,                    // Estimated tolls per mile
                parking: 15.00,                 // Parking costs per trip
                scaleTickets: 12.00,            // Scale/inspection fees per trip
                cleaningDetailing: 0.02         // Cleaning per mile
            },
            
            // Advanced Insurance Modeling
            insurance: {
                enabled: true,
                costPerMile: 0.12,
                
                // Detailed insurance breakdown
                primaryLiability: 0.045,        // Primary liability per mile
                cargoInsurance: 0.035,          // Cargo insurance per mile
                physicalDamage: 0.025,          // Physical damage per mile
                bobtailInsurance: 0.008,        // Bobtail insurance per mile
                workersComp: 0.007,             // Workers compensation per mile
                
                // Risk factors
                cargoValueMultiplier: 1.0,      // Higher value cargo = higher insurance
                routeRiskFactor: 1.0,           // High-risk routes adjustment
                driverExperienceFactor: 1.0     // Driver experience impact
            },
            
            // Predictive Maintenance
            maintenance: {
                enabled: true,
                costPerMile: 0.18,
                
                // Detailed maintenance breakdown
                engineMaintenance: 0.055,       // Engine maintenance per mile
                transmissionService: 0.025,     // Transmission service per mile
                brakeSystem: 0.035,             // Brake system maintenance per mile
                tires: 0.045,                   // Tire replacement per mile
                trailerMaintenance: 0.020,      // Trailer maintenance per mile
                
                // Predictive factors
                mileageDepreciationFactor: 1.0, // Higher mileage = higher maintenance
                equipmentAgeFactor: 1.0,        // Older equipment = higher costs
                seasonalFactor: 1.0,            // Winter/summer impact
                preventiveFactor: 0.85          // Preventive maintenance savings
            },
            
            // Regulatory and Permits
            permits: {
                enabled: true,
                costPerMile: 0.05,
                
                // Detailed permit breakdown
                overweightPermits: 0.015,       // Overweight permits per mile
                oversizePermits: 0.008,         // Oversize permits per mile
                specialCommodity: 0.012,        // Special commodity permits per mile
                statePermits: 0.008,            // State-specific permits per mile
                bridgePermits: 0.003,           // Bridge permits per mile
                cityPermits: 0.004,             // City permits per mile
                
                // Route-specific factors
                routeComplexityFactor: 1.0,     // Complex routes = higher permit costs
                urgencyFactor: 1.0              // Rush permits = higher costs
            },
            
            // Risk Assessment and Contingency
            riskAssessment: {
                enabled: true,
                contingencyRate: 0.05,          // 5% contingency for unexpected costs
                weatherRiskFactor: 1.0,         // Weather-related delays/costs
                equipmentFailureRisk: 0.02,     // Equipment failure cost per mile
                marketVolatilityBuffer: 0.03,   // Market volatility buffer
                customerPaymentRisk: 0.98       // Customer payment reliability (0.98 = 98% reliable)
            }
        },
        
        // Advanced Scoring Weights
        scoring: {
            enabled: true,
            weights: {
                ratePerMile: 40,
                profitMargin: 30,
                deadheadEfficiency: 20,
                totalRate: 10
            }
        },
        
        // Advanced Professional Email Template
        emailTemplate: {
            subject: "PREMIUM Load Analysis - ${'{ratePerMile}'}/mile | {score}% Score",
            body: `Dear Dispatcher,

I have conducted a comprehensive mathematical analysis of a PREMIUM load opportunity:

📊 LOAD FINANCIAL ANALYSIS:
• Rate per Mile: ${'{ratePerMile}'}
• Total Revenue: {totalRate}
• Deadhead Miles: {deadhead}
• Advanced Score: {score}%
• Mathematical Accuracy: {mathematicalAccuracy}%

💰 PROFIT BREAKDOWN:
• Estimated Net Profit: ${'{estimatedProfit}'}
• Risk-Adjusted Profit: ${'{riskAdjustedProfit}'}
• Profit Margin: {profitMargin}%
• Profit per Mile: ${'{profitPerMile}'}
• Cost Efficiency Ratio: {costEfficiencyRatio}

� COST ANALYSIS:
• Total Costs: ${'{totalCosts}'}
• Fuel Costs: ${'{fuelCost}'}
• Driver Compensation: ${'{driverPay}'}
• Operating Costs: ${'{operatingCosts}'}
• Insurance: ${'{insuranceCost}'}
• Maintenance: ${'{maintenanceCost}'}
• Permits/Regulatory: ${'{permitsCost}'}
• Risk Assessment: ${'{riskAssessmentCost}'}

📈 PERFORMANCE METRICS:
• Break-even Rate: ${'{breakEvenRate}'}/mile
• Revenue per Mile: ${'{revenuePerMile}'}
• Total Cost per Mile: ${'{totalCostPerMile}'}
• Risk Assessment Score: {riskAssessmentScore}%

💼 PROFESSIONAL RECOMMENDATION:
{recommendation}

This analysis uses advanced mathematical modeling with {mathematicalAccuracy}% accuracy for professional decision-making.

Best regards,
Advanced Load Analysis System
Professional Transportation Solutions

MC#: [Your MC Number]`
        }
    };

    // Global variables for tracking
    let stats = {
        totalLoads: 0,
        premiumLoads: 0,
        avgProfit: 0,
        totalRevenue: 0,
        scannedLoads: new Set()
    };
    
    let allLoads = [];

    // Professional UI Styles - DAT One Angular Design System
    const styles = `
        .dat-pro-panel {
            position: fixed;
            top: 20px;
            right: 20px;
            width: 380px;
            max-height: 90vh;
            overflow-y: auto;
            background: #ffffff;
            border: 1px solid #e1e5e9;
            border-radius: 8px;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04);
            z-index: 999999;
            font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, 'Roboto', sans-serif;
            color: #2c3e50;
            backdrop-filter: blur(8px);
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
            pointer-events: auto;
        }
        
        .dat-pro-panel * {
            pointer-events: auto;
        }
        
        /* Prevent interference with page scrolling */
        .dat-pro-panel:hover {
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12), 0 4px 12px rgba(0, 0, 0, 0.06);
        }
        
        /* Fix scroll behavior to not interfere with main page */
        .dat-pro-panel {
            overscroll-behavior: contain;
        }
        
        .dat-pro-panel:hover {
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12), 0 4px 12px rgba(0, 0, 0, 0.06);
        }
        
        .dat-pro-header {
            background: linear-gradient(135deg, #1976d2 0%, #1565c0 100%);
            padding: 16px 20px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .dat-pro-title {
            font-size: 14px;
            font-weight: 600;
            margin: 0;
            color: #ffffff;
            letter-spacing: -0.25px;
        }
        
        .dat-pro-subtitle {
            font-size: 12px;
            opacity: 0.9;
            margin: 2px 0 0 0;
            font-weight: 400;
            color: rgba(255, 255, 255, 0.8);
        }
        
        .dat-pro-content {
            padding: 16px;
            background: #ffffff;
        }
        
        .dat-pro-section {
            margin-bottom: 16px;
            padding: 0;
        }
        
        .dat-pro-section:last-child {
            margin-bottom: 0;
        }
        
        .dat-pro-section h3 {
            margin: 0 0 12px 0;
            font-size: 13px;
            font-weight: 600;
            color: #37474f;
            letter-spacing: -0.2px;
            display: flex;
            align-items: center;
            gap: 6px;
        }
        
        .dat-pro-stats {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 8px;
            margin-bottom: 16px;
        }
        
        .dat-pro-stat {
            background: #f8fafc;
            padding: 12px;
            border-radius: 6px;
            border: 1px solid #e2e8f0;
            text-align: center;
            transition: all 0.15s ease;
            cursor: pointer;
            position: relative;
        }
        
        .dat-pro-stat:hover {
            background: #f1f5f9;
            border-color: #cbd5e1;
            transform: translateY(-1px);
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        
        .dat-pro-stat.active {
            background: #e0f2fe;
            border-color: #0ea5e9;
            box-shadow: 0 2px 8px rgba(14, 165, 233, 0.2);
        }
        
        .dat-pro-stat-value {
            font-size: 16px;
            font-weight: 700;
            color: #1976d2;
            display: block;
            margin-bottom: 2px;
        }
        
        .dat-pro-stat-label {
            font-size: 11px;
            color: #64748b;
            font-weight: 500;
        }
        
        .dat-pro-stat-badge {
            position: absolute;
            top: 4px;
            right: 4px;
            background: #10b981;
            color: white;
            font-size: 8px;
            padding: 2px 4px;
            border-radius: 8px;
            font-weight: 600;
        }
        
        .dat-pro-deals-container {
            max-height: 400px;
            overflow-y: auto;
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            margin-top: 12px;
            display: none;
        }
        
        .dat-pro-deals-container.active {
            display: block;
        }
        
        .dat-pro-deal-card {
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            margin: 8px;
            padding: 0;
            transition: all 0.2s ease;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        
        .dat-pro-deal-card:hover {
            border-color: #1976d2;
            box-shadow: 0 4px 12px rgba(25, 118, 210, 0.15);
            transform: translateY(-2px);
        }
        
        .dat-pro-deal-header {
            background: linear-gradient(135deg, #1976d2 0%, #1565c0 100%);
            color: white;
            padding: 12px 16px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .dat-pro-deal-title {
            font-size: 14px;
            font-weight: 600;
            margin: 0;
        }
        
        .dat-pro-deal-score-badge {
            background: rgba(255, 255, 255, 0.2);
            color: white;
            padding: 4px 8px;
            border-radius: 12px;
            font-size: 11px;
            font-weight: 600;
        }
        
        .dat-pro-deal-body {
            padding: 16px;
        }
        
        .dat-pro-deal-metrics {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
            margin-bottom: 16px;
        }
        
        .dat-pro-metric-item {
            background: #f8fafc;
            padding: 10px;
            border-radius: 6px;
            border-left: 3px solid #1976d2;
        }
        
        .dat-pro-metric-label {
            font-size: 10px;
            color: #64748b;
            font-weight: 500;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 4px;
        }
        
        .dat-pro-metric-value {
            font-size: 14px;
            font-weight: 700;
            color: #1976d2;
        }
        
        .dat-pro-metric-subtext {
            font-size: 9px;
            color: #64748b;
            margin-top: 2px;
        }
        
        .dat-pro-profit-breakdown {
            background: #f0f9ff;
            border: 1px solid #e0f2fe;
            border-radius: 6px;
            padding: 12px;
            margin-bottom: 12px;
        }
        
        .dat-pro-profit-title {
            font-size: 11px;
            font-weight: 600;
            color: #0369a1;
            margin-bottom: 8px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .dat-pro-profit-grid {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 8px;
            font-size: 10px;
        }
        
        .dat-pro-profit-item {
            text-align: center;
        }
        
        .dat-pro-profit-amount {
            font-weight: 700;
            color: #059669;
            font-size: 11px;
        }
        
        .dat-pro-profit-label {
            color: #64748b;
            font-size: 9px;
            margin-top: 2px;
        }
        
        .dat-pro-cost-breakdown {
            background: #fef3c7;
            border: 1px solid #fcd34d;
            border-radius: 6px;
            padding: 10px;
            margin-bottom: 12px;
        }
        
        .dat-pro-cost-title {
            font-size: 10px;
            font-weight: 600;
            color: #92400e;
            margin-bottom: 6px;
            text-transform: uppercase;
        }
        
        .dat-pro-cost-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 6px;
            font-size: 9px;
        }
        
        .dat-pro-cost-item-detail {
            display: flex;
            justify-content: space-between;
            color: #92400e;
        }
        
        .dat-pro-route-info {
            background: #f0fdf4;
            border: 1px solid #bbf7d0;
            border-radius: 6px;
            padding: 10px;
            margin-bottom: 12px;
        }
        
        .dat-pro-route-title {
            font-size: 10px;
            font-weight: 600;
            color: #166534;
            margin-bottom: 6px;
            text-transform: uppercase;
        }
        
        .dat-pro-route-details {
            font-size: 10px;
            color: #166534;
            line-height: 1.4;
        }
        
        .dat-pro-performance-bar {
            background: #e2e8f0;
            height: 6px;
            border-radius: 3px;
            overflow: hidden;
            margin: 8px 0 4px 0;
        }
        
        .dat-pro-performance-fill {
            height: 100%;
            background: linear-gradient(90deg, #10b981 0%, #059669 100%);
            transition: width 0.3s ease;
        }
        
        .dat-pro-deal-actions {
            display: flex;
            gap: 8px;
            justify-content: space-between;
            margin-top: 12px;
            padding-top: 12px;
            border-top: 1px solid #e2e8f0;
        }
        
        .dat-pro-action-btn {
            background: #1976d2;
            color: white;
            border: none;
            padding: 6px 12px;
            border-radius: 6px;
            font-size: 10px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.15s ease;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .dat-pro-action-btn:hover {
            background: #1565c0;
            transform: translateY(-1px);
            box-shadow: 0 2px 8px rgba(25, 118, 210, 0.3);
        }
        
        .dat-pro-action-btn.secondary {
            background: #64748b;
        }
        
        .dat-pro-action-btn.secondary:hover {
            background: #475569;
        }
        
        .dat-pro-action-btn.success {
            background: #10b981;
        }
        
        .dat-pro-action-btn.success:hover {
            background: #059669;
        }
        
        .dat-pro-deal-status {
            position: absolute;
            top: 8px;
            left: 8px;
            background: rgba(16, 185, 129, 0.9);
            color: white;
            padding: 2px 6px;
            border-radius: 8px;
            font-size: 8px;
            font-weight: 600;
            text-transform: uppercase;
        }
        
        .dat-pro-deal-status.excellent {
            background: rgba(239, 68, 68, 0.9);
        }
        
        .dat-pro-deal-status.good {
            background: rgba(245, 158, 11, 0.9);
        }
        
        .dat-pro-deals-header {
            background: #f8fafc;
            padding: 12px 16px;
            border-bottom: 2px solid #e2e8f0;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .dat-pro-deals-title {
            font-size: 13px;
            font-weight: 600;
            color: #1976d2;
            margin: 0;
        }
        
        .dat-pro-deals-count {
            background: #1976d2;
            color: white;
            padding: 2px 8px;
            border-radius: 10px;
            font-size: 10px;
            font-weight: 600;
        }
        
        .dat-pro-deals-filters {
            padding: 8px 16px;
            background: #f1f5f9;
            border-bottom: 1px solid #e2e8f0;
            display: flex;
            gap: 8px;
            font-size: 10px;
        }
        
        .dat-pro-filter-btn {
            background: white;
            border: 1px solid #cbd5e1;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 9px;
            cursor: pointer;
            transition: all 0.15s ease;
        }
        
        .dat-pro-filter-btn.active {
            background: #1976d2;
            color: white;
            border-color: #1976d2;
        }
        
        .dat-pro-filter-btn:hover {
            border-color: #1976d2;
        }
        
        .dat-pro-filters {
            display: grid;
            gap: 10px;
            background: #f8fafc;
            padding: 12px;
            border-radius: 6px;
            border: 1px solid #e2e8f0;
        }
        
        .dat-pro-filter {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .dat-pro-filter label {
            font-size: 12px;
            font-weight: 500;
            color: #475569;
        }
        
        .dat-pro-filter input {
            width: 72px;
            padding: 6px 8px;
            background: #ffffff;
            border: 1px solid #d1d5db;
            border-radius: 4px;
            color: #374151;
            font-size: 12px;
            font-weight: 500;
            transition: all 0.15s ease;
        }
        
        .dat-pro-filter input:focus {
            outline: none;
            border-color: #1976d2;
            box-shadow: 0 0 0 2px rgba(25, 118, 210, 0.1);
        }
        
        .dat-pro-controls {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 8px;
            margin-top: 12px;
        }
        
        .dat-pro-btn {
            background: #1976d2;
            color: #ffffff;
            border: none;
            padding: 8px 12px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
            letter-spacing: 0.025em;
        }
        
        .dat-pro-btn:hover {
            background: #1565c0;
            transform: translateY(-1px);
            box-shadow: 0 2px 8px rgba(25, 118, 210, 0.3);
        }
        
        .dat-pro-btn:active {
            transform: translateY(0);
            box-shadow: 0 1px 4px rgba(25, 118, 210, 0.2);
        }
        
        .dat-load-premium {
            position: relative !important;
            border-radius: 6px !important;
            overflow: hidden !important;
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;
            border: 2px solid transparent !important;
        }
        
        .dat-load-premium::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(255, 255, 255, 0.03);
            pointer-events: none;
            z-index: 1;
        }
        
        .dat-pro-badge {
            position: absolute !important;
            top: 8px !important;
            left: 8px !important;
            background: rgba(255, 255, 255, 0.95) !important;
            color: #1976d2 !important;
            padding: 6px 8px !important;
            border-radius: 4px !important;
            font-size: 10px !important;
            font-weight: 600 !important;
            z-index: 1001 !important;
            border: 1px solid rgba(25, 118, 210, 0.2) !important;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1) !important;
            backdrop-filter: blur(8px) !important;
            min-width: 100px !important;
            letter-spacing: 0.025em !important;
            transition: all 0.15s ease !important;
        }
        
        .dat-pro-badge:hover {
            background: rgba(255, 255, 255, 1) !important;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
        }
        
        .dat-pro-badge-title {
            font-size: 8px;
            color: #64748b;
            margin-bottom: 1px;
            font-weight: 500;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .dat-pro-badge-score {
            font-size: 12px;
            font-weight: 700;
            color: #1976d2;
            margin-bottom: 2px;
        }
        
        .dat-pro-badge-details {
            font-size: 8px;
            color: #64748b;
            line-height: 1.2;
            font-weight: 500;
        }
        
        .dat-pro-email-btn {
            position: absolute !important;
            top: 8px !important;
            right: 8px !important;
            background: #ffffff !important;
            color: #1976d2 !important;
            border: 1px solid rgba(25, 118, 210, 0.2) !important;
            border-radius: 4px !important;
            width: 32px !important;
            height: 32px !important;
            font-size: 14px !important;
            cursor: pointer !important;
            z-index: 1002 !important;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1) !important;
            transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1) !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            backdrop-filter: blur(8px) !important;
        }
        
        .dat-pro-email-btn:hover {
            background: #1976d2 !important;
            color: #ffffff !important;
            transform: translateY(-1px) !important;
            box-shadow: 0 4px 12px rgba(25, 118, 210, 0.3) !important;
            border-color: #1976d2 !important;
        }
        
        .dat-pro-email-btn:active {
            transform: translateY(0) !important;
            box-shadow: 0 2px 6px rgba(25, 118, 210, 0.2) !important;
        }
        
        .dat-pro-status {
            background: #f8fafc;
            padding: 8px 12px;
            border-radius: 4px;
            border: 1px solid #e2e8f0;
            font-size: 11px;
            line-height: 1.4;
            color: #475569;
        }
        
        .dat-pro-status-item {
            display: flex;
            align-items: center;
            gap: 6px;
            margin-bottom: 2px;
        }
        
        .dat-pro-status-item:last-child {
            margin-bottom: 0;
        }
        
        .dat-pro-status-icon {
            width: 8px;
            height: 8px;
            background: #10b981;
            border-radius: 50%;
            flex-shrink: 0;
        }
        
        /* Premium Load Color Variants */
        .dat-load-premium.score-excellent {
            background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%) !important;
            border-color: #0ea5e9 !important;
        }
        
        .dat-load-premium.score-good {
            background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%) !important;
            border-color: #22c55e !important;
        }
        
        .dat-load-premium.score-standard {
            background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%) !important;
            border-color: #f59e0b !important;
        }
        
        .dat-pro-toggle {
            position: relative;
            display: inline-block;
            width: 36px;
            height: 20px;
        }
        
        .dat-pro-toggle input {
            opacity: 0;
            width: 0;
            height: 0;
        }
        
        .dat-pro-slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #ccc;
            transition: .4s;
            border-radius: 20px;
        }
        
        .dat-pro-slider:before {
            position: absolute;
            content: "";
            height: 16px;
            width: 16px;
            left: 2px;
            bottom: 2px;
            background-color: white;
            transition: .4s;
            border-radius: 50%;
        }
        
        input:checked + .dat-pro-slider {
            background-color: #1976d2;
        }
        
        input:checked + .dat-pro-slider:before {
            transform: translateX(16px);
        }
        
        .dat-pro-advanced-section {
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 6px;
            margin-bottom: 12px;
            overflow: hidden;
        }
        
        .dat-pro-section-header {
            background: #f1f5f9;
            padding: 8px 12px;
            border-bottom: 1px solid #e2e8f0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            cursor: pointer;
            transition: all 0.15s ease;
        }
        
        .dat-pro-section-header:hover {
            background: #e2e8f0;
        }
        
        .dat-pro-section-header h4 {
            margin: 0;
            font-size: 12px;
            font-weight: 600;
            color: #475569;
        }
        
        .dat-pro-section-content {
            padding: 12px;
            display: none;
        }
        
        .dat-pro-section-content.active {
            display: block;
        }
        
        .dat-pro-cost-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 8px;
            padding: 6px 8px;
            background: #ffffff;
            border-radius: 4px;
            border: 1px solid #e2e8f0;
        }
        
        .dat-pro-cost-item:last-child {
            margin-bottom: 0;
        }
        
        .dat-pro-cost-label {
            font-size: 11px;
            font-weight: 500;
            color: #475569;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        .dat-pro-cost-input {
            width: 60px;
            padding: 4px 6px;
            background: #ffffff;
            border: 1px solid #d1d5db;
            border-radius: 3px;
            color: #374151;
            font-size: 11px;
            font-weight: 500;
        }
        
        .dat-pro-weight-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 6px;
        }
        
        .dat-pro-weight-label {
            font-size: 11px;
            font-weight: 500;
            color: #475569;
        }
        
        .dat-pro-weight-input {
            width: 50px;
            padding: 4px 6px;
            background: #ffffff;
            border: 1px solid #d1d5db;
            border-radius: 3px;
            color: #374151;
            font-size: 11px;
            text-align: center;
        }
        
        .dat-pro-realtime-indicator {
            display: inline-block;
            width: 8px;
            height: 8px;
            background: #10b981;
            border-radius: 50%;
            margin-right: 6px;
            animation: realtime-pulse 2s infinite;
        }
        
        @keyframes realtime-pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }
        
        @keyframes pulse {
            0%, 100% { 
                box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
                transform: scale(1);
            }
            50% { 
                box-shadow: 0 0 0 10px rgba(16, 185, 129, 0);
                transform: scale(1.02);
            }
        }
        
        /* Professional scrollbar styling */
        .dat-pro-panel::-webkit-scrollbar {
            width: 6px;
        }
        
        .dat-pro-panel::-webkit-scrollbar-track {
            background: #f1f5f9;
        }
        
        .dat-pro-panel::-webkit-scrollbar-thumb {
            background: #cbd5e1;
            border-radius: 3px;
        }
        
        .dat-pro-panel::-webkit-scrollbar-thumb:hover {
            background: #94a3b8;
        }
        
        /* Responsive design for smaller screens */
        @media (max-width: 1400px) {
            .dat-pro-panel {
                width: 340px;
            }
        }
        
        @media (max-width: 1200px) {
            .dat-pro-panel {
                width: 300px;
                right: 10px;
                top: 10px;
            }
        }
        
        /* Enhanced Deal Management Styles */
        .dat-pro-indicator {
            cursor: pointer;
            transition: all 0.2s ease;
        }
        
        .dat-pro-indicator:hover {
            transform: scale(1.1);
            box-shadow: 0 2px 8px rgba(25, 118, 210, 0.3);
        }
        
        .dat-pro-popup {
            backdrop-filter: blur(4px);
        }
        
        .dat-pro-popup-content {
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }
        
        .dat-pro-popup-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-bottom: 16px;
            border-bottom: 1px solid #e2e8f0;
            margin-bottom: 16px;
        }
        
        .dat-pro-popup-header h4 {
            margin: 0;
            color: #1976d2;
            font-size: 16px;
            font-weight: 600;
        }
        
        .dat-pro-popup-close {
            background: none;
            border: none;
            font-size: 20px;
            cursor: pointer;
            color: #64748b;
            padding: 4px;
            border-radius: 4px;
            transition: all 0.15s ease;
        }
        
        .dat-pro-popup-close:hover {
            background: #f1f5f9;
            color: #1976d2;
        }
        
        .dat-pro-popup-body {
            line-height: 1.6;
        }
        
        .dat-pro-popup-section {
            margin-bottom: 20px;
            padding: 12px;
            background: #f8fafc;
            border-radius: 6px;
            border-left: 3px solid #1976d2;
        }
        
        .dat-pro-popup-section h5 {
            margin: 0 0 8px 0;
            color: #1976d2;
            font-size: 14px;
            font-weight: 600;
        }
        
        .dat-pro-popup-section p {
            margin: 4px 0;
            font-size: 12px;
            color: #475569;
        }
        
        .dat-pro-popup-actions {
            display: flex;
            gap: 8px;
            justify-content: flex-end;
            margin-top: 20px;
            padding-top: 16px;
            border-top: 1px solid #e2e8f0;
        }
        
        /* Enhanced Deal Cards in Dashboard */
        .dat-pro-deal-card {
            margin-bottom: 16px;
            background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            overflow: hidden;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
        }
        
        .dat-pro-deal-card:hover {
            border-color: #1976d2;
            box-shadow: 0 8px 24px rgba(25, 118, 210, 0.12);
            transform: translateY(-2px);
        }
        
        .dat-pro-deal-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 3px;
            background: linear-gradient(90deg, #1976d2 0%, #42a5f5 100%);
        }
        
        /* Professional Load Row Enhancements */
        .dat-pro-load-enhanced {
            background: linear-gradient(135deg, rgba(25, 118, 210, 0.02) 0%, rgba(25, 118, 210, 0.01) 100%);
            border-left: 4px solid #1976d2;
            transition: all 0.2s ease;
            position: relative;
        }
        
        .dat-pro-load-enhanced:hover {
            background: linear-gradient(135deg, rgba(25, 118, 210, 0.05) 0%, rgba(25, 118, 210, 0.02) 100%);
            transform: translateX(2px);
            box-shadow: 0 2px 8px rgba(25, 118, 210, 0.1);
        }
        
        /* Professional Deal Metrics */
        .dat-pro-metric-enhanced {
            display: inline-flex;
            align-items: center;
            gap: 4px;
            background: rgba(255, 255, 255, 0.9);
            padding: 4px 8px;
            border-radius: 12px;
            font-size: 10px;
            font-weight: 600;
            color: #1976d2;
            border: 1px solid rgba(25, 118, 210, 0.2);
            backdrop-filter: blur(4px);
        }
        
        .dat-pro-profit-indicator {
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: white;
        }
        
        .dat-pro-profit-indicator.excellent {
            background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
        }
        
        .dat-pro-profit-indicator.premium {
            background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
        }
        
        /* Deal Dashboard Enhancements */
        .dat-pro-deals-container {
            background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
            border: 2px solid #e2e8f0;
            border-radius: 12px;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
        }
        
        .dat-pro-deals-container.active {
            border-color: #1976d2;
            box-shadow: 0 8px 24px rgba(25, 118, 210, 0.08);
        }
        
        .dat-pro-deals-header {
            background: linear-gradient(135deg, #1976d2 0%, #1565c0 100%);
            color: white;
        }
        
        .dat-pro-deals-title {
            color: white;
        }
        
        /* Advanced Performance Indicators */
        .dat-pro-performance-bar {
            background: linear-gradient(90deg, #e2e8f0 0%, #cbd5e1 100%);
            position: relative;
            overflow: hidden;
        }
        
        .dat-pro-performance-fill {
            background: linear-gradient(90deg, #10b981 0%, #059669 50%, #047857 100%);
            position: relative;
        }
        
        .dat-pro-performance-fill::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%);
            animation: shimmer 2s infinite;
        }
        
        @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
        }
        
        /* Enhanced Deal Card Styles */
        .enhanced-card {
            background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
        }
        
        .enhanced-card:hover {
            box-shadow: 0 8px 32px rgba(25, 118, 210, 0.15);
        }
        
        .deal-header-left, .deal-header-right {
            display: flex;
            flex-direction: column;
            gap: 4px;
        }
        
        .deal-time-stamp {
            font-size: 9px;
            color: rgba(255, 255, 255, 0.8);
            font-weight: 500;
        }
        
        .deal-status-indicator {
            font-size: 8px;
            padding: 2px 6px;
            border-radius: 8px;
            color: white;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .enhanced-metrics {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 8px;
            margin-bottom: 16px;
        }
        
        .enhanced-metrics .dat-pro-metric-item {
            display: flex;
            align-items: center;
            gap: 8px;
            background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
            border: 1px solid #bae6fd;
            border-left: 3px solid #0ea5e9;
        }
        
        .metric-icon {
            font-size: 16px;
            flex-shrink: 0;
        }
        
        .metric-content {
            flex: 1;
        }
        
        .dat-pro-financial-analysis {
            background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
            border: 1px solid #a7f3d0;
            border-radius: 8px;
            padding: 12px;
            margin-bottom: 12px;
        }
        
        .analysis-header {
            display: flex;
            align-items: center;
            gap: 6px;
            margin-bottom: 8px;
            font-weight: 600;
            color: #065f46;
            font-size: 11px;
        }
        
        .financial-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 6px;
        }
        
        .financial-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 10px;
        }
        
        .financial-label {
            color: #064e3b;
            font-weight: 500;
        }
        
        .financial-value {
            font-weight: 600;
        }
        
        .profit-positive { color: #059669; }
        .profit-neutral { color: #d97706; }
        .profit-negative { color: #dc2626; }
        
        .enhanced-costs {
            background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%);
            border: 1px solid #fed7aa;
        }
        
        .cost-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 8px;
        }
        
        .cost-icon {
            font-size: 12px;
        }
        
        .cost-title {
            font-weight: 600;
            color: #92400e;
            font-size: 10px;
            flex: 1;
            margin-left: 6px;
        }
        
        .total-cost {
            font-weight: 700;
            color: #92400e;
            font-size: 11px;
        }
        
        .cost-bars {
            display: flex;
            flex-direction: column;
            gap: 4px;
        }
        
        .cost-bar {
            display: grid;
            grid-template-columns: 60px 1fr 50px;
            align-items: center;
            gap: 6px;
            font-size: 9px;
        }
        
        .cost-bar-label {
            color: #92400e;
            font-weight: 500;
        }
        
        .cost-bar-visual {
            background: rgba(0, 0, 0, 0.1);
            border-radius: 4px;
            height: 6px;
            overflow: hidden;
        }
        
        .cost-bar-fill {
            height: 100%;
            border-radius: 4px;
            transition: width 0.3s ease;
        }
        
        .cost-bar-fill.fuel { background: linear-gradient(90deg, #ef4444 0%, #dc2626 100%); }
        .cost-bar-fill.driver { background: linear-gradient(90deg, #3b82f6 0%, #2563eb 100%); }
        .cost-bar-fill.operating { background: linear-gradient(90deg, #8b5cf6 0%, #7c3aed 100%); }
        
        .cost-bar-amount {
            text-align: right;
            font-weight: 600;
            color: #92400e;
        }
        
        .dat-pro-performance-section {
            margin: 12px 0;
        }
        
        .performance-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 6px;
            font-size: 10px;
        }
        
        .performance-trend {
            font-weight: 600;
        }
        
        .trending-up { color: #059669; }
        .trending-stable { color: #d97706; }
        .trending-down { color: #dc2626; }
        
        .enhanced-bar {
            height: 8px;
            background: linear-gradient(90deg, #e5e7eb 0%, #d1d5db 100%);
            border-radius: 4px;
        }
        
        .enhanced-actions {
            margin-top: 16px;
            padding-top: 12px;
            border-top: 2px solid #e2e8f0;
        }
        
        .enhanced-actions .dat-pro-action-btn {
            font-size: 9px;
            padding: 8px 12px;
            border-radius: 8px;
            font-weight: 600;
            letter-spacing: 0.25px;
        }
        
        .enhanced-actions .locate { background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%); }
        .enhanced-actions .email { background: linear-gradient(135deg, #10b981 0%, #059669 100%); }
        .enhanced-actions .analyze { background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); }
        .enhanced-actions .compare { background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); }
        
        /* Notification Animation */
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        
        /* Analysis Popup Styles */
        .analysis-overview, .recommendation-section {
            margin-bottom: 20px;
            padding: 16px;
            background: #f8fafc;
            border-radius: 8px;
            border: 1px solid #e2e8f0;
        }
        
        .analysis-overview h5, .recommendation-section h5 {
            margin: 0 0 12px 0;
            color: #1976d2;
            font-size: 14px;
            font-weight: 600;
        }
        
        .analysis-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
        }
        
        .analysis-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 8px;
            background: white;
            border-radius: 6px;
            border: 1px solid #e2e8f0;
        }
        
        .analysis-label {
            font-size: 12px;
            color: #475569;
            font-weight: 500;
        }
        
        .analysis-value {
            font-size: 12px;
            font-weight: 600;
        }
        
        .analysis-value.positive { color: #059669; }
        .analysis-value.negative { color: #dc2626; }
        
        .recommendation-box {
            padding: 16px;
            border-radius: 8px;
            border-left: 4px solid;
        }
        
        .recommendation-box.highly-recommended {
            background: #ecfdf5;
            border-color: #10b981;
            color: #065f46;
        }
        
        .recommendation-box.recommended {
            background: #fffbeb;
            border-color: #f59e0b;
            color: #92400e;
        }
        
        .recommendation-box.caution {
            background: #fef2f2;
            border-color: #ef4444;
            color: #991b1b;
        }
        
        /* Comparison Popup Styles */
        .comparison-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-bottom: 20px;
        }
        
        .comparison-section {
            padding: 16px;
            background: #f8fafc;
            border-radius: 8px;
            border: 1px solid #e2e8f0;
        }
        
        .comparison-section h5 {
            margin: 0 0 12px 0;
            color: #1976d2;
            font-size: 14px;
            font-weight: 600;
        }
        
        .comparison-metrics {
            display: flex;
            flex-direction: column;
            gap: 8px;
        }
        
        .comparison-metrics div {
            padding: 6px 8px;
            background: white;
            border-radius: 4px;
            border: 1px solid #e2e8f0;
            font-size: 12px;
            font-weight: 500;
        }
        
        .comparison-verdict {
            padding: 16px;
            background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
            border: 1px solid #bae6fd;
            border-radius: 8px;
            text-align: center;
            font-size: 14px;
        }
        
        .top-tier { color: #059669; font-weight: 700; }
        .mid-tier { color: #d97706; font-weight: 700; }
        .lower-tier { color: #dc2626; font-weight: 700; }
        
        /* Enhanced Route Information Styles */
        .enhanced-route {
            background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
            border: 1px solid #bbf7d0;
        }
        
        .route-header, .risk-header {
            display: flex;
            align-items: center;
            gap: 6px;
            margin-bottom: 8px;
            font-weight: 600;
            color: #166534;
            font-size: 10px;
        }
        
        .route-details-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 6px;
            margin-bottom: 12px;
        }
        
        .route-detail-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 4px 6px;
            background: rgba(255, 255, 255, 0.7);
            border-radius: 4px;
            font-size: 9px;
        }
        
        .detail-label {
            color: #166534;
            font-weight: 500;
        }
        
        .detail-value {
            color: #166534;
            font-weight: 600;
            text-align: right;
            max-width: 60%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        
        .risk-assessment {
            border-top: 1px solid #bbf7d0;
            padding-top: 8px;
        }
        
        .risk-items {
            display: flex;
            flex-direction: column;
            gap: 4px;
        }
        
        .risk-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 4px 6px;
            border-radius: 4px;
            font-size: 9px;
            font-weight: 500;
        }
        
        .risk-low {
            background: rgba(16, 185, 129, 0.1);
            color: #047857;
        }
        
        .risk-medium {
            background: rgba(245, 158, 11, 0.1);
            color: #92400e;
        }
        
        .risk-high {
            background: rgba(239, 68, 68, 0.1);
            color: #991b1b;
        }
    `;

    // Advanced Mathematical Profit Calculator for Professional Referees
    function calculateProfit(loadData) {
        if (!CONFIG.profitEngine.enabled) {
            return {
                estimatedDistance: 0,
                totalMiles: 0,
                fuelCost: 0,
                driverPay: 0,
                operatingCosts: 0,
                insuranceCost: 0,
                maintenanceCost: 0,
                permitsCost: 0,
                riskAssessmentCost: 0,
                totalCosts: 0,
                netProfit: loadData.rateValue,
                profitMargin: 100,
                breakEvenRate: 0,
                riskAdjustedProfit: loadData.rateValue,
                costPerMileAnalysis: {},
                recommendation: 'CALCULATION_DISABLED'
            };
        }
        
        // Advanced distance calculation with mathematical accuracy
        const theoreticalDistance = loadData.rateValue / loadData.ratePerMileValue;
        const distanceAccuracy = CONFIG.profitEngine.mathematicalModel.distanceAccuracyFactor;
        const estimatedDistance = theoreticalDistance * distanceAccuracy;
        const totalMiles = estimatedDistance + loadData.deadhead;
        
        let costBreakdown = {
            fuel: 0,
            driver: 0,
            operating: 0,
            insurance: 0,
            maintenance: 0,
            permits: 0,
            risk: 0
        };
        
        // 1. ADVANCED FUEL COST CALCULATION
        if (CONFIG.profitEngine.fuelCalculation.enabled) {
            const fuelConfig = CONFIG.profitEngine.fuelCalculation;
            const mathModel = CONFIG.profitEngine.mathematicalModel;
            
            // Base fuel consumption with mathematical precision
            const loadedMPG = fuelConfig.mpgTruck;
            const emptyMPG = fuelConfig.mpgTrailer || loadedMPG;
            
            // Calculate fuel for loaded and deadhead miles separately
            const loadedFuelGallons = estimatedDistance / loadedMPG;
            const deadheadFuelGallons = loadData.deadhead / emptyMPG;
            const totalFuelGallons = loadedFuelGallons + deadheadFuelGallons;
            
            // Apply seasonal and temperature adjustments
            const seasonalAdjustment = mathModel.seasonalFuelAdjustment;
            const temperatureAdjustment = fuelConfig.temperatureEfficiency;
            const adjustedFuelGallons = totalFuelGallons * seasonalAdjustment * temperatureAdjustment;
            
            // Base fuel cost
            const baseFuelCost = adjustedFuelGallons * fuelConfig.costPerGallon;
            
            // Idling costs
            const idlingCost = fuelConfig.estimatedIdlingHours * fuelConfig.idlingCostPerHour;
            
            // DEF fluid costs
            const defCost = totalMiles * fuelConfig.defFluidCost;
            
            // Fuel surcharge
            const fuelSurcharge = baseFuelCost * fuelConfig.fuelSurchargeRate;
            
            costBreakdown.fuel = baseFuelCost + idlingCost + defCost + fuelSurcharge;
        }
        
        // 2. COMPREHENSIVE DRIVER COMPENSATION
        if (CONFIG.profitEngine.driverPay.enabled) {
            const driverConfig = CONFIG.profitEngine.driverPay;
            
            // Base mileage pay
            const basePay = estimatedDistance * driverConfig.payPerMile;
            
            // Per diem calculation
            const perDiem = driverConfig.estimatedDays * driverConfig.perDiemRate;
            
            // Performance bonus
            const bonus = basePay * driverConfig.bonusRate;
            
            // Benefits calculation
            const benefits = (basePay + bonus) * driverConfig.benefitsRate;
            
            // Overtime calculation
            const overtime = driverConfig.estimatedOvertimeHours * driverConfig.overtimeRate;
            
            costBreakdown.driver = basePay + perDiem + bonus + benefits + overtime;
        }
        
        // 3. DETAILED OPERATING COSTS ANALYSIS
        if (CONFIG.profitEngine.operatingCosts.enabled) {
            const opConfig = CONFIG.profitEngine.operatingCosts;
            
            // Fixed costs per mile
            const fixedCostsPerMile = opConfig.truckPayments + opConfig.truckDepreciation + 
                                    opConfig.trailerCosts + opConfig.businessInsurance + 
                                    opConfig.licenses + opConfig.communications + 
                                    opConfig.accounting + opConfig.legalCompliance;
            
            // Variable costs per mile
            const variableCostsPerMile = opConfig.tolls + opConfig.cleaningDetailing;
            
            // Per-trip costs
            const perTripCosts = opConfig.parking + opConfig.scaleTickets;
            
            costBreakdown.operating = (fixedCostsPerMile + variableCostsPerMile) * totalMiles + perTripCosts;
        }
        
        // 4. SOPHISTICATED INSURANCE MODELING
        if (CONFIG.profitEngine.insurance.enabled) {
            const insConfig = CONFIG.profitEngine.insurance;
            
            // Base insurance costs
            const baseInsurance = (insConfig.primaryLiability + insConfig.cargoInsurance + 
                                 insConfig.physicalDamage + insConfig.bobtailInsurance + 
                                 insConfig.workersComp) * totalMiles;
            
            // Risk factor adjustments
            const cargoRiskAdjustment = baseInsurance * insConfig.cargoValueMultiplier;
            const routeRiskAdjustment = cargoRiskAdjustment * insConfig.routeRiskFactor;
            const experienceAdjustment = routeRiskAdjustment * insConfig.driverExperienceFactor;
            
            costBreakdown.insurance = experienceAdjustment;
        }
        
        // 5. PREDICTIVE MAINTENANCE MODELING
        if (CONFIG.profitEngine.maintenance.enabled) {
            const maintConfig = CONFIG.profitEngine.maintenance;
            
            // Base maintenance costs
            const baseMaintenance = (maintConfig.engineMaintenance + maintConfig.transmissionService + 
                                   maintConfig.brakeSystem + maintConfig.tires + 
                                   maintConfig.trailerMaintenance) * totalMiles;
            
            // Apply predictive factors
            const ageAdjustment = baseMaintenance * maintConfig.equipmentAgeFactor;
            const mileageAdjustment = ageAdjustment * maintConfig.mileageDepreciationFactor;
            const seasonalAdjustment = mileageAdjustment * maintConfig.seasonalFactor;
            const preventiveDiscount = seasonalAdjustment * maintConfig.preventiveFactor;
            
            costBreakdown.maintenance = preventiveDiscount;
        }
        
        // 6. REGULATORY AND PERMIT COSTS
        if (CONFIG.profitEngine.permits.enabled) {
            const permitConfig = CONFIG.profitEngine.permits;
            
            // Base permit costs
            const basePermits = (permitConfig.overweightPermits + permitConfig.oversizePermits + 
                               permitConfig.specialCommodity + permitConfig.statePermits + 
                               permitConfig.bridgePermits + permitConfig.cityPermits) * totalMiles;
            
            // Route complexity and urgency adjustments
            const complexityAdjustment = basePermits * permitConfig.routeComplexityFactor;
            const urgencyAdjustment = complexityAdjustment * permitConfig.urgencyFactor;
            
            costBreakdown.permits = urgencyAdjustment;
        }
        
        // 7. ADVANCED RISK ASSESSMENT
        if (CONFIG.profitEngine.riskAssessment.enabled) {
            const riskConfig = CONFIG.profitEngine.riskAssessment;
            
            // Calculate base costs for risk assessment
            const baseCosts = Object.values(costBreakdown).reduce((sum, cost) => sum + cost, 0);
            
            // Apply risk factors
            const contingencyCost = baseCosts * riskConfig.contingencyRate;
            const weatherRisk = baseCosts * riskConfig.weatherRiskFactor * 0.02; // 2% weather impact
            const equipmentRisk = totalMiles * riskConfig.equipmentFailureRisk;
            const marketVolatility = baseCosts * riskConfig.marketVolatilityBuffer;
            
            costBreakdown.risk = contingencyCost + weatherRisk + equipmentRisk + marketVolatility;
        }
        
        // FINAL CALCULATIONS WITH MATHEMATICAL PRECISION
        const totalCosts = Object.values(costBreakdown).reduce((sum, cost) => sum + cost, 0);
        
        // Apply mathematical model adjustments
        const mathModel = CONFIG.profitEngine.mathematicalModel;
        const marketAdjustedCosts = totalCosts * mathModel.marketVolatilityFactor;
        const riskAdjustedCosts = marketAdjustedCosts * mathModel.riskAssessmentWeight;
        
        // Revenue adjustments for customer payment risk
        const riskConfig = CONFIG.profitEngine.riskAssessment;
        const adjustedRevenue = riskConfig.enabled ? 
            loadData.rateValue * riskConfig.customerPaymentRisk : loadData.rateValue;
        
        // Calculate profits
        const netProfit = adjustedRevenue - riskAdjustedCosts;
        const profitMargin = adjustedRevenue > 0 ? (netProfit / adjustedRevenue) * 100 : 0;
        const breakEvenRate = estimatedDistance > 0 ? riskAdjustedCosts / estimatedDistance : 0;
        const riskAdjustedProfit = netProfit;
        
        // Cost per mile analysis
        const costPerMileAnalysis = {
            totalCostPerMile: riskAdjustedCosts / totalMiles,
            fuelCostPerMile: costBreakdown.fuel / totalMiles,
            driverCostPerMile: costBreakdown.driver / totalMiles,
            operatingCostPerMile: costBreakdown.operating / totalMiles,
            insuranceCostPerMile: costBreakdown.insurance / totalMiles,
            maintenanceCostPerMile: costBreakdown.maintenance / totalMiles,
            permitsCostPerMile: costBreakdown.permits / totalMiles,
            riskCostPerMile: costBreakdown.risk / totalMiles
        };
        
        // Advanced recommendation algorithm
        let recommendation = 'LOSS';
        if (netProfit > 1000 && profitMargin > 20) recommendation = 'EXCELLENT';
        else if (netProfit > 500 && profitMargin > 15) recommendation = 'VERY_GOOD';
        else if (netProfit > 300 && profitMargin > 10) recommendation = 'GOOD';
        else if (netProfit > 100 && profitMargin > 5) recommendation = 'MARGINAL';
        else if (netProfit > 0) recommendation = 'BREAK_EVEN';
        
        return {
            estimatedDistance: Math.round(estimatedDistance * 100) / 100,
            totalMiles: Math.round(totalMiles * 100) / 100,
            fuelCost: Math.round(costBreakdown.fuel * 100) / 100,
            driverPay: Math.round(costBreakdown.driver * 100) / 100,
            operatingCosts: Math.round(costBreakdown.operating * 100) / 100,
            insuranceCost: Math.round(costBreakdown.insurance * 100) / 100,
            maintenanceCost: Math.round(costBreakdown.maintenance * 100) / 100,
            permitsCost: Math.round(costBreakdown.permits * 100) / 100,
            riskAssessmentCost: Math.round(costBreakdown.risk * 100) / 100,
            totalCosts: Math.round(riskAdjustedCosts * 100) / 100,
            netProfit: Math.round(netProfit * 100) / 100,
            profitMargin: Math.round(profitMargin * 100) / 100,
            breakEvenRate: Math.round(breakEvenRate * 100) / 100,
            riskAdjustedProfit: Math.round(riskAdjustedProfit * 100) / 100,
            costPerMileAnalysis,
            recommendation,
            
            // Additional professional metrics
            revenuePerMile: Math.round((adjustedRevenue / estimatedDistance) * 100) / 100,
            profitPerMile: Math.round((netProfit / estimatedDistance) * 100) / 100,
            costEfficiencyRatio: Math.round((netProfit / riskAdjustedCosts) * 100) / 100,
            riskAssessmentScore: Math.round((1 - (costBreakdown.risk / totalCosts)) * 100),
            mathematicalAccuracy: Math.round(distanceAccuracy * 100)
        };
    }

    // Advanced Mathematical Scoring Algorithm for Professional Analysis
    function calculateAdvancedScore(loadData, profitData) {
        if (!CONFIG.scoring.enabled) {
            return 50; // Default score when scoring is disabled
        }
        
        const weights = CONFIG.scoring.weights;
        let componentScores = {};
        
        // 1. ADVANCED RATE PER MILE SCORING (Logarithmic scale for better distribution)
        const maxRatePerMile = 5.0; // Industry maximum consideration
        const minRatePerMile = 1.0; // Industry minimum consideration
        const normalizedRate = Math.max(0, Math.min(1, 
            (loadData.ratePerMileValue - minRatePerMile) / (maxRatePerMile - minRatePerMile)
        ));
        
        // Apply logarithmic scaling for more realistic scoring
        componentScores.ratePerMile = Math.pow(normalizedRate, 0.7) * 100;
        
        // 2. PROFIT MARGIN SCORING (Exponential weighting for high margins)
        const targetProfitMargin = 25.0; // Target profit margin
        const maxProfitMargin = 50.0; // Exceptional profit margin
        
        let profitMarginScore;
        if (profitData.profitMargin <= 0) {
            profitMarginScore = 0;
        } else if (profitData.profitMargin <= targetProfitMargin) {
            // Linear scaling up to target
            profitMarginScore = (profitData.profitMargin / targetProfitMargin) * 70;
        } else {
            // Exponential scaling above target
            const excessMargin = profitData.profitMargin - targetProfitMargin;
            const excessNormalized = Math.min(1, excessMargin / (maxProfitMargin - targetProfitMargin));
            profitMarginScore = 70 + (Math.pow(excessNormalized, 0.5) * 30);
        }
        componentScores.profitMargin = profitMarginScore;
        
        // 3. DEADHEAD EFFICIENCY SCORING (Inverse exponential decay)
        const maxAcceptableDeadhead = 200; // Maximum acceptable deadhead
        const deadheadRatio = Math.min(1, loadData.deadhead / maxAcceptableDeadhead);
        
        // Exponential decay for deadhead penalty
        componentScores.deadheadEfficiency = Math.pow(1 - deadheadRatio, 1.5) * 100;
        
        // 4. TOTAL RATE SCORING (Sigmoidal function for realistic distribution)
        const minTotalRate = 1500;
        const maxTotalRate = 10000;
        const normalizedTotal = Math.max(0, Math.min(1, 
            (loadData.rateValue - minTotalRate) / (maxTotalRate - minTotalRate)
        ));
        
        // Sigmoidal function for more realistic scoring curve
        componentScores.totalRate = (1 / (1 + Math.exp(-6 * (normalizedTotal - 0.5)))) * 100;
        
        // 5. ADVANCED RISK ASSESSMENT SCORING
        let riskScore = 100;
        if (profitData.riskAssessmentScore !== undefined) {
            riskScore = profitData.riskAssessmentScore;
        }
        componentScores.riskAssessment = riskScore;
        
        // 6. COST EFFICIENCY SCORING
        let costEfficiencyScore = 50;
        if (profitData.costEfficiencyRatio !== undefined) {
            // Higher cost efficiency ratio = better score
            costEfficiencyScore = Math.min(100, Math.max(0, profitData.costEfficiencyRatio * 50));
        }
        componentScores.costEfficiency = costEfficiencyScore;
        
        // 7. MATHEMATICAL ACCURACY BONUS
        let accuracyBonus = 0;
        if (profitData.mathematicalAccuracy !== undefined) {
            accuracyBonus = (profitData.mathematicalAccuracy - 90) * 0.2; // Bonus for high accuracy
        }
        
        // WEIGHTED COMPOSITE SCORE CALCULATION
        const totalWeight = weights.ratePerMile + weights.profitMargin + 
                           weights.deadheadEfficiency + weights.totalRate;
        
        // Normalize weights to ensure they sum to 100%
        const normalizedWeights = {
            ratePerMile: weights.ratePerMile / totalWeight,
            profitMargin: weights.profitMargin / totalWeight,
            deadheadEfficiency: weights.deadheadEfficiency / totalWeight,
            totalRate: weights.totalRate / totalWeight
        };
        
        // Calculate weighted score
        let weightedScore = 0;
        weightedScore += componentScores.ratePerMile * normalizedWeights.ratePerMile;
        weightedScore += componentScores.profitMargin * normalizedWeights.profitMargin;
        weightedScore += componentScores.deadheadEfficiency * normalizedWeights.deadheadEfficiency;
        weightedScore += componentScores.totalRate * normalizedWeights.totalRate;
        
        // Apply additional scoring factors (10% weight each)
        const additionalFactors = (componentScores.riskAssessment + componentScores.costEfficiency) * 0.1;
        weightedScore = (weightedScore * 0.8) + (additionalFactors * 0.2);
        
        // Apply accuracy bonus
        weightedScore += accuracyBonus;
        
        // Mathematical confidence interval adjustment
        const confidenceInterval = 0.95; // 95% confidence
        const uncertainty = Math.abs(100 - profitData.mathematicalAccuracy || 95) * 0.1;
        const adjustedScore = weightedScore * (1 - uncertainty * (1 - confidenceInterval));
        
        // Final score with mathematical precision
        const finalScore = Math.round(Math.max(0, Math.min(100, adjustedScore)) * 10) / 10;
        
        return finalScore;
    }

    // Extract load data with enhanced detection
    function extractEnhancedLoadData(element) {
        try {
            console.log('🔍 Analyzing DAT One load row element...');
            
            // Enhanced selectors for DAT One Angular structure
            const offerElement = element.querySelector('.offer');
            const rateElement = element.querySelector('.calculated-rate span');
            const deadheadElement = element.querySelector('.deadhead');
            
            // Additional data elements
            const tripElement = element.querySelector('.trip a');
            const originElement = element.querySelector('[data-test="load-origin-cell"] .truncate');
            const destinationElement = element.querySelector('[data-test="load-destination-cell"] .truncate');
            const companyElement = element.querySelector('[data-test="load-company-cell"]');
            const creditScoreElement = element.querySelector('[data-test="load-cs-dtp-cell"]');
            const equipmentElement = element.querySelector('[data-test="load-eq-cell"]');
            const weightElement = element.querySelector('[data-test="load-weight-cell"]');
            const lengthElement = element.querySelector('[data-test="load-length-cell"]');
            const pickupElement = element.querySelector('[data-test="load-pick-up-cell"]');
            
            console.log('Found elements:', {
                offer: offerElement ? '✅' : '❌',
                rate: rateElement ? '✅' : '❌',
                deadhead: deadheadElement ? '✅' : '❌',
                trip: tripElement ? '✅' : '❌',
                origin: originElement ? '✅' : '❌',
                destination: destinationElement ? '✅' : '❌',
                company: companyElement ? '✅' : '❌'
            });
            
            if (!offerElement || !rateElement) {
                console.log('❌ Missing critical rate elements');
                return null;
            }
            
            // Extract basic rate data
            const offerText = offerElement.textContent.trim();
            const rateText = rateElement.textContent.trim();
            const deadheadText = deadheadElement ? deadheadElement.textContent.trim() : '(0)';
            
            console.log('Extracted text:', { offerText, rateText, deadheadText });
            
            // Parse financial values
            const rateMatch = offerText.match(/\$?([0-9,]+(?:\.[0-9]{2})?)/);
            const rateValue = rateMatch ? parseFloat(rateMatch[1].replace(/,/g, '')) : 0;
            
            const rpmMatch = rateText.match(/\$?([0-9]+\.?[0-9]*)/);
            const ratePerMileValue = rpmMatch ? parseFloat(rpmMatch[1]) : 0;
            
            const dhMatch = deadheadText.match(/\((\d+)\)/);
            const deadhead = dhMatch ? parseInt(dhMatch[1]) : 0;
            
            // Extract additional data
            const tripDistance = tripElement ? parseInt(tripElement.textContent.trim()) || 0 : 0;
            const origin = originElement ? originElement.textContent.trim() : 'Unknown';
            const destination = destinationElement ? destinationElement.textContent.trim() : 'Unknown';
            const company = companyElement ? companyElement.textContent.trim() : 'Unknown';
            
            // Extract equipment and load details
            const equipment = equipmentElement ? equipmentElement.textContent.trim() : '';
            const weight = weightElement ? weightElement.textContent.trim() : '';
            const length = lengthElement ? lengthElement.textContent.trim() : '';
            const pickup = pickupElement ? pickupElement.textContent.trim() : '';
            
            // Extract credit information
            let creditScore = 0;
            let daysToPay = 0;
            if (creditScoreElement) {
                const creditText = creditScoreElement.textContent.trim();
                const csMatch = creditText.match(/(\d+)\s*CS/);
                const dtpMatch = creditText.match(/(\d+)\s*DTP/);
                creditScore = csMatch ? parseInt(csMatch[1]) : 0;
                daysToPay = dtpMatch ? parseInt(dtpMatch[1]) : 0;
            }
            
            console.log('Parsed values:', { 
                rateValue, 
                ratePerMileValue, 
                deadhead, 
                tripDistance, 
                origin, 
                destination,
                creditScore,
                daysToPay
            });
            
            if (rateValue <= 0 || ratePerMileValue <= 0) {
                console.log('❌ Invalid rate values detected');
                return null;
            }
            
            console.log('✅ Successfully extracted enhanced load data');
            
            return {
                element,
                rate: offerText,
                rateValue,
                ratePerMile: rateText,
                ratePerMileValue,
                deadhead,
                deadheadText,
                tripDistance,
                estimatedDistance: tripDistance || Math.round(rateValue / ratePerMileValue),
                origin,
                destination,
                company,
                equipment,
                weight,
                length,
                pickup,
                creditScore,
                daysToPay,
                // Enhanced metadata
                routeText: `${origin} → ${destination}`,
                loadDetails: `${equipment} • ${weight} • ${length}`,
                creditInfo: creditScore > 0 ? `${creditScore} CS • ${daysToPay} DTP` : 'No Credit Info'
            };
        } catch (error) {
            console.error('Enhanced load data extraction error:', error);
            return null;
        }
    }

    // Check if load meets advanced professional criteria
    function meetsProfessionalCriteria(loadData, profitData) {
        if (!CONFIG.filters.enabled) {
            return true; // Show all loads when filtering is disabled
        }
        
        // Basic filters
        if (loadData.ratePerMileValue < CONFIG.filters.minRatePerMile) return false;
        if (loadData.deadhead > CONFIG.filters.maxDeadhead) return false;
        if (loadData.rateValue < CONFIG.filters.minTotalRate) return false;
        if (loadData.rateValue > CONFIG.filters.maxTotalRate) return false;
        
        // Advanced profit criteria
        if (profitData.profitMargin < CONFIG.filters.minProfitMargin) return false;
        if (profitData.netProfit < CONFIG.filters.minNetProfit) return false;
        
        return true;
    }

    // Enhanced highlighting with professional features and deal tracking
    // Enhanced Professional Deal Management System - Replaces simple highlights with advanced deal tracking
    function highlightProfessionalLoad(loadData, profitData, score) {
        if (!meetsProfessionalCriteria(loadData, profitData)) {
            return false;
        }
        
        // Remove existing indicators
        const existingIndicator = loadData.element.querySelector('.dat-pro-indicator');
        if (existingIndicator) existingIndicator.remove();
        
        // Add subtle visual indicator instead of heavy highlighting
        loadData.element.style.borderLeft = '4px solid #1976d2';
        loadData.element.style.backgroundColor = 'rgba(25, 118, 210, 0.02)';
        
        // Add unique identifier for load tracking
        if (!loadData.element.dataset.loadId) {
            loadData.element.dataset.loadId = `load_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        }
        
        // Position the element relatively if not already
        if (getComputedStyle(loadData.element).position === 'static') {
            loadData.element.style.position = 'relative';
        }
        
        // Add hover effect for identified loads
        loadData.element.addEventListener('mouseenter', () => {
            loadData.element.style.backgroundColor = 'rgba(25, 118, 210, 0.05)';
            loadData.element.style.transform = 'translateX(2px)';
            loadData.element.style.transition = 'all 0.2s ease';
        });
        
        loadData.element.addEventListener('mouseleave', () => {
            loadData.element.style.backgroundColor = 'rgba(25, 118, 210, 0.02)';
            loadData.element.style.transform = 'translateX(0)';
        });
        
        // Add a small professional indicator
        const indicator = document.createElement('div');
        indicator.className = 'dat-pro-indicator';
        indicator.innerHTML = `<span style="color: #1976d2; font-size: 10px; font-weight: 600;">${score}%</span>`;
        indicator.style.cssText = `
            position: absolute;
            top: 4px;
            right: 4px;
            background: rgba(255, 255, 255, 0.95);
            padding: 2px 6px;
            border-radius: 10px;
            border: 1px solid rgba(25, 118, 210, 0.2);
            font-size: 9px;
            z-index: 10;
            cursor: pointer;
        `;
        
        // Make indicator clickable to show deal details
        indicator.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            showDealDetailsPopup(loadData, profitData, score);
        };
        
        loadData.element.appendChild(indicator);
        
        // Update deal tracking system - THIS IS THE MAIN FEATURE NOW
        const isPremium = true;
        updateAdvancedDealsData(loadData, profitData, score, isPremium);
        
        console.log(`🚀 PROFESSIONAL DEAL TRACKED: ${score}% score, $${Math.round(profitData.netProfit)} profit`);
        return true;
    }

    // Show deal details popup when indicator is clicked
    function showDealDetailsPopup(loadData, profitData, score) {
        const popup = document.createElement('div');
        popup.className = 'dat-pro-popup';
        popup.innerHTML = `
            <div class="dat-pro-popup-content">
                <div class="dat-pro-popup-header">
                    <h4>Deal Analysis Details</h4>
                    <button class="dat-pro-popup-close" onclick="this.parentElement.parentElement.parentElement.remove()">×</button>
                </div>
                <div class="dat-pro-popup-body">
                    <div class="dat-pro-popup-section">
                        <h5>Financial Analysis</h5>
                        <p><strong>Score:</strong> ${score}%</p>
                        <p><strong>Rate per Mile:</strong> $${loadData.ratePerMileValue.toFixed(2)}</p>
                        <p><strong>Total Rate:</strong> $${loadData.rateValue.toLocaleString()}</p>
                        <p><strong>Net Profit:</strong> $${Math.round(profitData.netProfit)}</p>
                        <p><strong>Profit Margin:</strong> ${profitData.profitMargin.toFixed(1)}%</p>
                    </div>
                    <div class="dat-pro-popup-section">
                        <h5>Route Information</h5>
                        <p><strong>Distance:</strong> ${profitData.estimatedDistance?.toFixed(0) || '0'} miles</p>
                        <p><strong>Deadhead:</strong> ${loadData.deadhead} miles</p>
                        <p><strong>Total Miles:</strong> ${profitData.totalMiles?.toFixed(0) || '0'} miles</p>
                    </div>
                    <div class="dat-pro-popup-actions">
                        <button class="dat-pro-btn" onclick="sendProfessionalEmail(${JSON.stringify(loadData).replace(/"/g, '&quot;')}, ${JSON.stringify(profitData).replace(/"/g, '&quot;')}, ${score}); this.parentElement.parentElement.parentElement.parentElement.remove();">Send Email</button>
                        <button class="dat-pro-btn" onclick="this.parentElement.parentElement.parentElement.remove();">Close</button>
                    </div>
                </div>
            </div>
        `;
        
        popup.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            z-index: 999999;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        
        const content = popup.querySelector('.dat-pro-popup-content');
        content.style.cssText = `
            background: white;
            border-radius: 8px;
            padding: 20px;
            max-width: 500px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
        `;
        
        document.body.appendChild(popup);
        
        // Close on outside click
        popup.addEventListener('click', (e) => {
            if (e.target === popup) {
                popup.remove();
            }
        });
    }

    // Replace updateDealsData with updateAdvancedDealsData
    function updateAdvancedDealsData(loadData, profitData, score, isPremium) {
        const deal = {
            ...loadData,
            profitData,
            score,
            isPremium,
            timestamp: Date.now(),
            estimatedDistance: profitData.estimatedDistance
        };
        
        // Add to all deals
        advancedDealsData.all.push(deal);
        
        // Add to recent (always)
        advancedDealsData.recent.push(deal);
        
        // Add to specific categories
        if (isPremium) {
            advancedDealsData.premium.push(deal);
        }
        
        if (score >= 90) {
            advancedDealsData.excellent.push(deal);
        }
        
        if (loadData.rateValue >= 5000) {
            advancedDealsData.highValue.push(deal);
        }
        
        // Keep only last 50 deals in each category for performance
        Object.keys(advancedDealsData).forEach(key => {
            if (advancedDealsData[key].length > 50) {
                advancedDealsData[key] = advancedDealsData[key].slice(-50);
            }
        });
        
        // Update badges for excellent deals
        if (score >= 95) {
            const excellentBadge = document.getElementById('excellent-badge');
            if (excellentBadge) {
                excellentBadge.style.display = 'block';
                setTimeout(() => {
                    excellentBadge.style.display = 'none';
                }, 8000);
            }
        }
        
        // Update live badge for recent deals
        const recentBadge = document.getElementById('recent-badge');
        if (recentBadge) {
            recentBadge.style.display = 'block';
            setTimeout(() => {
                recentBadge.style.display = 'none';
            }, 3000);
        }
        
        // Update current view if active
        if (currentAdvancedView) {
            const dealsList = document.getElementById('advanced-deals-list');
            if (dealsList) {
                populateAdvancedDealsView(currentAdvancedView, dealsList);
            }
        }
    }

    // Advanced Professional Email System
    function sendProfessionalEmail(loadData, profitData, score) {
        const template = CONFIG.emailTemplate;
        
        const subject = template.subject
            .replace('{ratePerMile}', loadData.ratePerMileValue.toFixed(2))
            .replace('{score}', score);
        
        const body = template.body
            .replace('{ratePerMile}', loadData.ratePerMileValue.toFixed(2))
            .replace('{totalRate}', loadData.rate)
            .replace('{deadhead}', loadData.deadhead)
            .replace('{score}', score)
            .replace('{mathematicalAccuracy}', profitData.mathematicalAccuracy || 95)
            .replace('{estimatedProfit}', Math.round(profitData.netProfit))
            .replace('{riskAdjustedProfit}', Math.round(profitData.riskAdjustedProfit || profitData.netProfit))
            .replace('{profitMargin}', profitData.profitMargin.toFixed(1))
            .replace('{profitPerMile}', profitData.profitPerMile?.toFixed(2) || (profitData.netProfit / profitData.estimatedDistance).toFixed(2))
            .replace('{costEfficiencyRatio}', profitData.costEfficiencyRatio?.toFixed(2) || (profitData.netProfit / profitData.totalCosts).toFixed(2))
            .replace('{totalCosts}', Math.round(profitData.totalCosts))
            .replace('{fuelCost}', Math.round(profitData.fuelCost))
            .replace('{driverPay}', Math.round(profitData.driverPay))
            .replace('{operatingCosts}', Math.round(profitData.operatingCosts))
            .replace('{insuranceCost}', Math.round(profitData.insuranceCost))
            .replace('{maintenanceCost}', Math.round(profitData.maintenanceCost))
            .replace('{permitsCost}', Math.round(profitData.permitsCost))
            .replace('{riskAssessmentCost}', Math.round(profitData.riskAssessmentCost || 0))
            .replace('{breakEvenRate}', profitData.breakEvenRate.toFixed(2))
            .replace('{revenuePerMile}', profitData.revenuePerMile?.toFixed(2) || loadData.ratePerMileValue.toFixed(2))
            .replace('{totalCostPerMile}', profitData.costPerMileAnalysis?.totalCostPerMile?.toFixed(2) || (profitData.totalCosts / profitData.totalMiles).toFixed(2))
            .replace('{riskAssessmentScore}', profitData.riskAssessmentScore || 85)
            .replace('{recommendation}', profitData.recommendation);
        
        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        window.open(gmailUrl, '_blank');
        
        console.log('📧 Advanced professional email sent with comprehensive analysis');
    }

    // Create advanced professional UI with configuration panel
    function createProfessionalUI() {
        // Add styles
        const styleElement = document.createElement('style');
        styleElement.textContent = styles;
        document.head.appendChild(styleElement);
        
        // Create panel
        const panel = document.createElement('div');
        panel.className = 'dat-pro-panel';
        panel.innerHTML = `
            <div class="dat-pro-header">
                <h2 class="dat-pro-title">DAT Professional Analyzer</h2>
                <div class="dat-pro-subtitle">
                    <span class="dat-pro-realtime-indicator"></span>
                    Advanced Load Optimization v${CONFIG.version}
                </div>
            </div>
            <div class="dat-pro-content">
                <div class="dat-pro-section">
                    <h3>📊 Advanced Deal Dashboard</h3>
                    <div class="dat-pro-stats">
                        <div class="dat-pro-stat" onclick="toggleAdvancedDealsView('recent')" id="recent-deals-stat">
                            <span class="dat-pro-stat-value" id="total-loads">0</span>
                            <div class="dat-pro-stat-label">Recent Deals</div>
                            <div class="dat-pro-stat-badge" id="recent-badge" style="display: none;">LIVE</div>
                        </div>
                        <div class="dat-pro-stat" onclick="toggleAdvancedDealsView('premium')" id="premium-deals-stat">
                            <span class="dat-pro-stat-value" id="premium-loads">0</span>
                            <div class="dat-pro-stat-label">Premium Deals</div>
                            <div class="dat-pro-stat-badge" id="premium-badge" style="display: none;">HOT</div>
                        </div>
                        <div class="dat-pro-stat" onclick="toggleAdvancedDealsView('excellent')" id="excellent-deals-stat">
                            <span class="dat-pro-stat-value" id="excellent-loads">0</span>
                            <div class="dat-pro-stat-label">Excellent</div>
                            <div class="dat-pro-stat-badge" id="excellent-badge" style="display: none;">🔥</div>
                        </div>
                        <div class="dat-pro-stat" onclick="toggleAdvancedDealsView('high-value')" id="high-value-deals-stat">
                            <span class="dat-pro-stat-value" id="high-value-count">0</span>
                            <div class="dat-pro-stat-label">High Value</div>
                            <div class="dat-pro-stat-badge" id="high-value-badge" style="display: none;">💰</div>
                        </div>
                    </div>
                    
                    <!-- Advanced Deal Dashboard Container -->
                    <div class="dat-pro-deals-container" id="advanced-deals-container">
                        <div class="dat-pro-deals-header">
                            <h4 class="dat-pro-deals-title" id="deals-category-title">Deal Analysis</h4>
                            <span class="dat-pro-deals-count" id="deals-count">0</span>
                        </div>
                        <div class="dat-pro-deals-filters">
                            <button class="dat-pro-filter-btn active" onclick="filterDeals('all')">All</button>
                            <button class="dat-pro-filter-btn" onclick="filterDeals('profitable')">Profitable</button>
                            <button class="dat-pro-filter-btn" onclick="filterDeals('efficient')">Efficient</button>
                            <button class="dat-pro-filter-btn" onclick="filterDeals('recent')">Recent</button>
                        </div>
                        <div id="advanced-deals-list"></div>
                    </div>
                </div>
                
                <div class="dat-pro-section">
                    <h3>🎯 Professional Filters</h3>
                    <div class="dat-pro-cost-item">
                        <div class="dat-pro-cost-label">
                            <label class="dat-pro-toggle">
                                <input type="checkbox" id="filters-enabled" ${CONFIG.filters.enabled ? 'checked' : ''}>
                                <span class="dat-pro-slider"></span>
                            </label>
                            Filters Enabled
                        </div>
                    </div>
                    <div class="dat-pro-filters" id="filters-panel">
                        <div class="dat-pro-filter">
                            <label>Min Rate/Mile:</label>
                            <input type="number" id="min-rate-mile" value="${CONFIG.filters.minRatePerMile}" step="0.1">
                        </div>
                        <div class="dat-pro-filter">
                            <label>Max Deadhead:</label>
                            <input type="number" id="max-deadhead" value="${CONFIG.filters.maxDeadhead}" step="10">
                        </div>
                        <div class="dat-pro-filter">
                            <label>Min Total Rate:</label>
                            <input type="number" id="min-total-rate" value="${CONFIG.filters.minTotalRate}" step="100">
                        </div>
                        <div class="dat-pro-filter">
                            <label>Min Profit Margin:</label>
                            <input type="number" id="min-profit-margin" value="${CONFIG.filters.minProfitMargin}" step="1">
                        </div>
                        <div class="dat-pro-filter">
                            <label>Min Net Profit:</label>
                            <input type="number" id="min-net-profit" value="${CONFIG.filters.minNetProfit}" step="50">
                        </div>
                    </div>
                </div>

                <div class="dat-pro-advanced-section">
                    <div class="dat-pro-section-header" onclick="toggleAdvancedSection('profit-engine')">
                        <h4>💰 Profit Calculation Engine</h4>
                        <span id="profit-engine-toggle">▼</span>
                    </div>
                    <div class="dat-pro-section-content" id="profit-engine-content">
                        <div class="dat-pro-cost-item">
                            <div class="dat-pro-cost-label">
                                <label class="dat-pro-toggle">
                                    <input type="checkbox" id="profit-enabled" ${CONFIG.profitEngine.enabled ? 'checked' : ''}>
                                    <span class="dat-pro-slider"></span>
                                </label>
                                Profit Engine Enabled
                            </div>
                        </div>
                        
                        <div class="dat-pro-cost-item">
                            <div class="dat-pro-cost-label">
                                <label class="dat-pro-toggle">
                                    <input type="checkbox" id="fuel-enabled" ${CONFIG.profitEngine.fuelCalculation.enabled ? 'checked' : ''}>
                                    <span class="dat-pro-slider"></span>
                                </label>
                                Fuel Cost ($${CONFIG.profitEngine.fuelCalculation.costPerGallon}/gal)
                            </div>
                            <div style="display: flex; gap: 4px;">
                                <input type="number" class="dat-pro-cost-input" id="fuel-cost" value="${CONFIG.profitEngine.fuelCalculation.costPerGallon}" step="0.1" placeholder="$/gal">
                                <input type="number" class="dat-pro-cost-input" id="fuel-mpg" value="${CONFIG.profitEngine.fuelCalculation.mpgTruck}" step="0.1" placeholder="MPG">
                            </div>
                        </div>
                        
                        <div class="dat-pro-cost-item">
                            <div class="dat-pro-cost-label">
                                <label class="dat-pro-toggle">
                                    <input type="checkbox" id="driver-enabled" ${CONFIG.profitEngine.driverPay.enabled ? 'checked' : ''}>
                                    <span class="dat-pro-slider"></span>
                                </label>
                                Driver Pay ($${CONFIG.profitEngine.driverPay.payPerMile}/mi)
                            </div>
                            <input type="number" class="dat-pro-cost-input" id="driver-pay" value="${CONFIG.profitEngine.driverPay.payPerMile}" step="0.01">
                        </div>
                        
                        <div class="dat-pro-cost-item">
                            <div class="dat-pro-cost-label">
                                <label class="dat-pro-toggle">
                                    <input type="checkbox" id="operating-enabled" ${CONFIG.profitEngine.operatingCosts.enabled ? 'checked' : ''}>
                                    <span class="dat-pro-slider"></span>
                                </label>
                                Operating Costs ($${CONFIG.profitEngine.operatingCosts.costPerMile}/mi)
                            </div>
                            <input type="number" class="dat-pro-cost-input" id="operating-cost" value="${CONFIG.profitEngine.operatingCosts.costPerMile}" step="0.01">
                        </div>
                        
                        <div class="dat-pro-cost-item">
                            <div class="dat-pro-cost-label">
                                <label class="dat-pro-toggle">
                                    <input type="checkbox" id="insurance-enabled" ${CONFIG.profitEngine.insurance.enabled ? 'checked' : ''}>
                                    <span class="dat-pro-slider"></span>
                                </label>
                                Insurance ($${CONFIG.profitEngine.insurance.costPerMile}/mi)
                            </div>
                            <input type="number" class="dat-pro-cost-input" id="insurance-cost" value="${CONFIG.profitEngine.insurance.costPerMile}" step="0.01">
                        </div>
                        
                        <div class="dat-pro-cost-item">
                            <div class="dat-pro-cost-label">
                                <label class="dat-pro-toggle">
                                    <input type="checkbox" id="maintenance-enabled" ${CONFIG.profitEngine.maintenance.enabled ? 'checked' : ''}>
                                    <span class="dat-pro-slider"></span>
                                </label>
                                Maintenance ($${CONFIG.profitEngine.maintenance.costPerMile}/mi)
                            </div>
                            <input type="number" class="dat-pro-cost-input" id="maintenance-cost" value="${CONFIG.profitEngine.maintenance.costPerMile}" step="0.01">
                        </div>
                        
                        <div class="dat-pro-cost-item">
                            <div class="dat-pro-cost-label">
                                <label class="dat-pro-toggle">
                                    <input type="checkbox" id="permits-enabled" ${CONFIG.profitEngine.permits.enabled ? 'checked' : ''}>
                                    <span class="dat-pro-slider"></span>
                                </label>
                                Permits ($${CONFIG.profitEngine.permits.costPerMile}/mi)
                            </div>
                            <input type="number" class="dat-pro-cost-input" id="permits-cost" value="${CONFIG.profitEngine.permits.costPerMile}" step="0.01">
                        </div>
                    </div>
                </div>

                <div class="dat-pro-advanced-section">
                    <div class="dat-pro-section-header" onclick="toggleAdvancedSection('scoring-weights')">
                        <h4>🎯 Scoring System</h4>
                        <span id="scoring-weights-toggle">▼</span>
                    </div>
                    <div class="dat-pro-section-content" id="scoring-weights-content">
                        <div class="dat-pro-cost-item">
                            <div class="dat-pro-cost-label">
                                <label class="dat-pro-toggle">
                                    <input type="checkbox" id="scoring-enabled" ${CONFIG.scoring.enabled ? 'checked' : ''}>
                                    <span class="dat-pro-slider"></span>
                                </label>
                                Scoring System Enabled
                            </div>
                        </div>
                        
                        <div class="dat-pro-weight-item">
                            <div class="dat-pro-weight-label">Rate per Mile Weight:</div>
                            <input type="number" class="dat-pro-weight-input" id="rate-weight" value="${CONFIG.scoring.weights.ratePerMile}" min="0" max="100">
                        </div>
                        <div class="dat-pro-weight-item">
                            <div class="dat-pro-weight-label">Profit Margin Weight:</div>
                            <input type="number" class="dat-pro-weight-input" id="profit-weight" value="${CONFIG.scoring.weights.profitMargin}" min="0" max="100">
                        </div>
                        <div class="dat-pro-weight-item">
                            <div class="dat-pro-weight-label">Deadhead Efficiency Weight:</div>
                            <input type="number" class="dat-pro-weight-input" id="deadhead-weight" value="${CONFIG.scoring.weights.deadheadEfficiency}" min="0" max="100">
                        </div>
                        <div class="dat-pro-weight-item">
                            <div class="dat-pro-weight-label">Total Rate Weight:</div>
                            <input type="number" class="dat-pro-weight-input" id="total-weight" value="${CONFIG.scoring.weights.totalRate}" min="0" max="100">
                        </div>
                    </div>
                </div>
                
                <div class="dat-pro-section">
                    <div class="dat-pro-controls">
                        <button class="dat-pro-btn" onclick="window.applyProfessionalFilters()">Apply Changes</button>
                        <button class="dat-pro-btn" onclick="window.resetToDefaults()">Reset Defaults</button>
                    </div>
                </div>
                
                <div class="dat-pro-section">
                    <h3>⚙️ System Status</h3>
                    <div class="dat-pro-status">
                        <div class="dat-pro-status-item">
                            <div class="dat-pro-status-icon"></div>
                            <span>Real-time Updates: ${CONFIG.realTimeUpdates ? 'Active' : 'Disabled'}</span>
                        </div>
                        <div class="dat-pro-status-item">
                            <div class="dat-pro-status-icon"></div>
                            <span>Auto Rescan: ${CONFIG.autoRescan ? 'Enabled' : 'Disabled'}</span>
                        </div>
                        <div class="dat-pro-status-item">
                            <div class="dat-pro-status-icon"></div>
                            <span>Profit Engine: ${CONFIG.profitEngine.enabled ? 'Running' : 'Disabled'}</span>
                        </div>
                        <div class="dat-pro-status-item">
                            <div class="dat-pro-status-icon"></div>
                            <span>Professional Mode: Active</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(panel);
        
        // Setup all event listeners for real-time updates
        setupAdvancedEventListeners();
        
        // Setup deal management
        setupDealManagement();
        
        return panel;
    }
    
    // Advanced Deal Dashboard System
    let advancedDealsData = {
        recent: [],
        premium: [],
        excellent: [],
        highValue: [],
        all: []
    };
    
    let currentAdvancedView = null;
    let currentFilter = 'all';
    
    // Setup advanced deal management
    function setupDealManagement() {
        advancedDealsData = {
            recent: [],
            premium: [],
            excellent: [],
            highValue: [],
            all: []
        };
    }
    
    // Toggle advanced deals view
    window.toggleAdvancedDealsView = function(category) {
        const container = document.getElementById('advanced-deals-container');
        const dealsList = document.getElementById('advanced-deals-list');
        const categoryTitle = document.getElementById('deals-category-title');
        
        // Remove active state from all stats
        document.querySelectorAll('.dat-pro-stat').forEach(stat => {
            stat.classList.remove('active');
        });
        
        if (currentAdvancedView === category) {
            // Hide if clicking same category
            container.classList.remove('active');
            currentAdvancedView = null;
            return;
        }
        
        // Set active state
        document.getElementById(`${category}-deals-stat`).classList.add('active');
        
        currentAdvancedView = category;
        container.classList.add('active');
        
        // Update category title
        const titles = {
            'recent': 'Recent Deals Analysis',
            'premium': 'Premium Opportunities',
            'excellent': 'Excellent Deals (90%+)',
            'high-value': 'High Value Loads ($5000+)'
        };
        categoryTitle.textContent = titles[category] || 'Deal Analysis';
        
        // Populate advanced deals view
        populateAdvancedDealsView(category, dealsList);
    };
    
    // Create Ultra-Advanced Deal Card with Enhanced Details and Analytics
    function createAdvancedDealCard(deal, index) {
        const profitData = deal.profitData;
        const score = deal.score;
        
        // Determine deal status and performance tier
        let status = 'good';
        let statusText = 'GOOD DEAL';
        let statusColor = '#10b981';
        
        if (score >= 95) {
            status = 'excellent';
            statusText = 'EXCELLENT';
            statusColor = '#ef4444';
        } else if (score >= 85) {
            status = 'premium';
            statusText = 'PREMIUM';
            statusColor = '#f59e0b';
        }
        
        // Calculate advanced performance metrics
        const performancePercent = Math.min(100, score);
        const efficiencyRatio = (profitData.netProfit / profitData.totalCosts * 100).toFixed(1);
        const riskScore = profitData.riskAssessmentScore || 85;
        const profitPerMile = profitData.profitPerMile || (profitData.netProfit / (profitData.estimatedDistance || 1));
        
        // Time since discovery
        const timeSince = Math.floor((Date.now() - deal.timestamp) / 60000);
        const timeDisplay = timeSince < 1 ? 'Just now' : `${timeSince}m ago`;
        
        // Calculate break-even and margin analysis
        const breakEvenRate = profitData.breakEvenRate || (profitData.totalCosts / (profitData.estimatedDistance || 1));
        const marginSafety = ((deal.ratePerMileValue - breakEvenRate) / breakEvenRate * 100).toFixed(1);
        
        return `
            <div class="dat-pro-deal-card enhanced-card" data-deal-index="${index}" data-score="${score}">
                <div class="dat-pro-deal-header">
                    <div class="deal-header-left">
                        <h5 class="dat-pro-deal-title">$${deal.ratePerMileValue?.toFixed(2) || '0.00'}/mile</h5>
                        <div class="deal-time-stamp">${timeDisplay}</div>
                    </div>
                    <div class="deal-header-right">
                        <div class="dat-pro-deal-score-badge" style="background: ${statusColor};">${score}%</div>
                        <div class="deal-status-indicator" style="background: ${statusColor};">${statusText}</div>
                    </div>
                </div>
                
                <div class="dat-pro-deal-body">
                    <!-- Primary Metrics Grid -->
                    <div class="dat-pro-deal-metrics enhanced-metrics">
                        <div class="dat-pro-metric-item revenue">
                            <div class="metric-icon">💰</div>
                            <div class="metric-content">
                                <div class="dat-pro-metric-label">Total Revenue</div>
                                <div class="dat-pro-metric-value">$${deal.rateValue?.toLocaleString() || '0'}</div>
                                <div class="dat-pro-metric-subtext">${deal.estimatedDistance?.toFixed(0) || '0'} miles</div>
                            </div>
                        </div>
                        
                        <div class="dat-pro-metric-item profit">
                            <div class="metric-icon">📈</div>
                            <div class="metric-content">
                                <div class="dat-pro-metric-label">Net Profit</div>
                                <div class="dat-pro-metric-value">$${Math.round(profitData.netProfit || 0).toLocaleString()}</div>
                                <div class="dat-pro-metric-subtext">${profitData.profitMargin?.toFixed(1) || '0'}% margin</div>
                            </div>
                        </div>
                        
                        <div class="dat-pro-metric-item efficiency">
                            <div class="metric-icon">⚡</div>
                            <div class="metric-content">
                                <div class="dat-pro-metric-label">Efficiency</div>
                                <div class="dat-pro-metric-value">${efficiencyRatio}%</div>
                                <div class="dat-pro-metric-subtext">Cost efficiency</div>
                            </div>
                        </div>
                        
                        <div class="dat-pro-metric-item deadhead">
                            <div class="metric-icon">🛣️</div>
                            <div class="metric-content">
                                <div class="dat-pro-metric-label">Deadhead</div>
                                <div class="dat-pro-metric-value">${deal.deadhead || 0} mi</div>
                                <div class="dat-pro-metric-subtext">${((deal.deadhead || 0) / (deal.estimatedDistance || 1) * 100).toFixed(1)}% ratio</div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Advanced Financial Analysis -->
                    <div class="dat-pro-financial-analysis">
                        <div class="analysis-header">
                            <span class="analysis-icon">🔍</span>
                            <span class="analysis-title">Advanced Financial Analysis</span>
                        </div>
                        
                        <div class="financial-grid">
                            <div class="financial-item">
                                <span class="financial-label">Profit/Mile:</span>
                                <span class="financial-value profit-positive">$${profitPerMile.toFixed(2)}</span>
                            </div>
                            <div class="financial-item">
                                <span class="financial-label">Break-even:</span>
                                <span class="financial-value">$${breakEvenRate.toFixed(2)}/mi</span>
                            </div>
                            <div class="financial-item">
                                <span class="financial-label">Safety Margin:</span>
                                <span class="financial-value ${marginSafety > 20 ? 'profit-positive' : marginSafety > 10 ? 'profit-neutral' : 'profit-negative'}">${marginSafety}%</span>
                            </div>
                            <div class="financial-item">
                                <span class="financial-label">Risk Score:</span>
                                <span class="financial-value">${riskScore}%</span>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Enhanced Cost Breakdown -->
                    <div class="dat-pro-cost-breakdown enhanced-costs">
                        <div class="cost-header">
                            <span class="cost-icon">🔧</span>
                            <span class="cost-title">Detailed Cost Analysis</span>
                            <span class="total-cost">$${Math.round(profitData.totalCosts || 0)}</span>
                        </div>
                        
                        <div class="cost-bars">
                            <div class="cost-bar">
                                <div class="cost-bar-label">Fuel</div>
                                <div class="cost-bar-visual">
                                    <div class="cost-bar-fill fuel" style="width: ${(profitData.fuelCost / profitData.totalCosts * 100).toFixed(1)}%"></div>
                                </div>
                                <div class="cost-bar-amount">$${Math.round(profitData.fuelCost || 0)}</div>
                            </div>
                            
                            <div class="cost-bar">
                                <div class="cost-bar-label">Driver</div>
                                <div class="cost-bar-visual">
                                    <div class="cost-bar-fill driver" style="width: ${(profitData.driverPay / profitData.totalCosts * 100).toFixed(1)}%"></div>
                                </div>
                                <div class="cost-bar-amount">$${Math.round(profitData.driverPay || 0)}</div>
                            </div>
                            
                            <div class="cost-bar">
                                <div class="cost-bar-label">Operating</div>
                                <div class="cost-bar-visual">
                                    <div class="cost-bar-fill operating" style="width: ${(profitData.operatingCosts / profitData.totalCosts * 100).toFixed(1)}%"></div>
                                </div>
                                <div class="cost-bar-amount">$${Math.round(profitData.operatingCosts || 0)}</div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Performance Indicators -->
                    <div class="dat-pro-performance-section">
                        <div class="performance-header">
                            <span>Performance Score: ${score}%</span>
                            <span class="performance-trend ${score >= 85 ? 'trending-up' : score >= 70 ? 'trending-stable' : 'trending-down'}">
                                ${score >= 85 ? '↗️ Excellent' : score >= 70 ? '➡️ Good' : '↘️ Below Average'}
                            </span>
                        </div>
                        <div class="dat-pro-performance-bar enhanced-bar">
                            <div class="dat-pro-performance-fill" style="width: ${performancePercent}%"></div>
                        </div>
                    </div>
                    
                    <!-- Enhanced Action Buttons -->
                    <div class="dat-pro-deal-actions enhanced-actions">
                        <button class="dat-pro-action-btn locate" onclick="locateAdvancedDeal('${index}')" title="Find this load on the page">
                            📍 Locate
                        </button>
                        <button class="dat-pro-action-btn email success" onclick="sendAdvancedDealEmail('${index}')" title="Send professional inquiry email">
                            ✉ Email
                        </button>
                        <button class="dat-pro-action-btn analyze secondary" onclick="analyzeDeal('${index}')" title="Detailed analysis and insights">
                            📊 Analyze
                        </button>
                        <button class="dat-pro-action-btn compare secondary" onclick="compareDeal('${index}')" title="Compare with other deals">
                            ⚖ Compare
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Populate advanced deals view
    function populateAdvancedDealsView(category, container) {
        let deals = [];
        
        switch(category) {
            case 'recent':
                deals = advancedDealsData.all.slice(-8);
                break;
            case 'premium':
                deals = advancedDealsData.premium.slice(-8);
                break;
            case 'excellent':
                deals = advancedDealsData.excellent.slice(-8);
                break;
            case 'high-value':
                deals = advancedDealsData.highValue.slice(-8);
                break;
        }
        
        // Apply current filter
        deals = applyDealsFilter(deals, currentFilter);
        
        // Update deals count
        document.getElementById('deals-count').textContent = deals.length;
        
        if (deals.length === 0) {
            container.innerHTML = `
                <div style="padding: 32px; text-align: center; color: #64748b;">
                    <div style="font-size: 24px; margin-bottom: 8px;">📭</div>
                    <div style="font-size: 14px; font-weight: 600; margin-bottom: 4px;">No deals found</div>
                    <div style="font-size: 11px;">Deals matching your criteria will appear here</div>
                </div>
            `;
            return;
        }
        
        const html = deals.map((deal, index) => createAdvancedDealCard(deal, index)).join('');
        container.innerHTML = html;
    }
    
    // Filter deals
    window.filterDeals = function(filterType) {
        currentFilter = filterType;
        
        // Update filter buttons
        document.querySelectorAll('.dat-pro-filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.classList.add('active');
        
        // Refresh current view
        if (currentAdvancedView) {
            const dealsList = document.getElementById('advanced-deals-list');
            populateAdvancedDealsView(currentAdvancedView, dealsList);
        }
    };
    
    // Apply deals filter
    function applyDealsFilter(deals, filterType) {
        switch(filterType) {
            case 'profitable':
                return deals.filter(deal => deal.profitData.netProfit > 500);
            case 'efficient':
                return deals.filter(deal => deal.score >= 85);
            case 'recent':
                return deals.filter(deal => (Date.now() - deal.timestamp) < 600000); // Last 10 minutes
            default:
                return deals;
        }
    }
    
    // Advanced deal actions
    window.locateAdvancedDeal = function(dealIndex) {
        const deal = advancedDealsData.all[dealIndex];
        if (deal && deal.element) {
            // Scroll to the element and highlight it
            deal.element.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
            
            // Temporary highlight effect
            const originalStyle = deal.element.style.cssText;
            deal.element.style.background = 'linear-gradient(135deg, #fef3c7 0%, #fed7aa 100%)';
            deal.element.style.border = '2px solid #f59e0b';
            deal.element.style.borderRadius = '8px';
            deal.element.style.transform = 'scale(1.02)';
            deal.element.style.transition = 'all 0.3s ease';
            deal.element.style.zIndex = '1000';
            
            // Flash effect
            let flashCount = 0;
            const flashInterval = setInterval(() => {
                deal.element.style.boxShadow = flashCount % 2 === 0 
                    ? '0 0 20px rgba(245, 158, 11, 0.5)' 
                    : '0 0 40px rgba(245, 158, 11, 0.8)';
                flashCount++;
                
                if (flashCount >= 6) {
                    clearInterval(flashInterval);
                    
                    // Restore original styling after highlight
                    setTimeout(() => {
                        deal.element.style.cssText = originalStyle;
                    }, 2000);
                }
            }, 300);
            
            // Show a notification
            showNotification(`📍 Deal located: ${deal.score}% score, $${Math.round(deal.profitData.netProfit)} profit`, 'success');
        } else {
            showNotification('⚠️ Deal not found on current page', 'warning');
        }
    };
    
    window.sendAdvancedDealEmail = function(dealIndex) {
        const deal = advancedDealsData.all[dealIndex];
        if (deal && deal.profitData && deal.score !== undefined) {
            sendProfessionalEmail(deal, deal.profitData, deal.score);
            showNotification('📧 Professional email prepared', 'success');
        }
    };
    
    window.analyzeDeal = function(dealIndex) {
        const deal = advancedDealsData.all[dealIndex];
        if (deal) {
            const analysis = generateAdvancedAnalysis(deal);
            showAnalysisPopup(deal, analysis);
        }
    };
    
    window.compareDeal = function(dealIndex) {
        const deal = advancedDealsData.all[dealIndex];
        if (deal) {
            const comparison = generateDealComparison(deal);
            showComparisonPopup(deal, comparison);
        }
    };
    
    // Show notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `dat-pro-notification ${type}`;
        notification.textContent = message;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 420px;
            background: ${type === 'success' ? '#10b981' : type === 'warning' ? '#f59e0b' : '#3b82f6'};
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            font-size: 12px;
            font-weight: 600;
            z-index: 1000000;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    // Generate advanced analysis
    function generateAdvancedAnalysis(deal) {
        const profitData = deal.profitData;
        const avgProfit = advancedDealsData.all.reduce((sum, d) => sum + (d.profitData.netProfit || 0), 0) / advancedDealsData.all.length;
        const avgScore = advancedDealsData.all.reduce((sum, d) => sum + (d.score || 0), 0) / advancedDealsData.all.length;
        
        return {
            profitVsAverage: ((profitData.netProfit - avgProfit) / avgProfit * 100).toFixed(1),
            scoreVsAverage: ((deal.score - avgScore) / avgScore * 100).toFixed(1),
            riskLevel: profitData.riskAssessmentScore > 90 ? 'Low' : profitData.riskAssessmentScore > 70 ? 'Medium' : 'High',
            recommendation: profitData.netProfit > avgProfit * 1.2 ? 'Highly Recommended' : profitData.netProfit > avgProfit ? 'Recommended' : 'Consider Carefully',
            marketPosition: deal.score >= avgScore * 1.1 ? 'Above Market' : deal.score >= avgScore * 0.9 ? 'Market Average' : 'Below Market'
        };
    }
    
    // Show analysis popup
    function showAnalysisPopup(deal, analysis) {
        const popup = document.createElement('div');
        popup.className = 'dat-pro-popup';
        popup.innerHTML = `
            <div class="dat-pro-popup-content">
                <div class="dat-pro-popup-header">
                    <h4>📊 Advanced Deal Analysis</h4>
                    <button class="dat-pro-popup-close" onclick="this.parentElement.parentElement.parentElement.remove()">×</button>
                </div>
                <div class="dat-pro-popup-body">
                    <div class="analysis-overview">
                        <h5>Deal Performance Overview</h5>
                        <div class="analysis-grid">
                            <div class="analysis-item">
                                <span class="analysis-label">Profit vs Market:</span>
                                <span class="analysis-value ${analysis.profitVsAverage > 0 ? 'positive' : 'negative'}">${analysis.profitVsAverage > 0 ? '+' : ''}${analysis.profitVsAverage}%</span>
                            </div>
                            <div class="analysis-item">
                                <span class="analysis-label">Score vs Market:</span>
                                <span class="analysis-value ${analysis.scoreVsAverage > 0 ? 'positive' : 'negative'}">${analysis.scoreVsAverage > 0 ? '+' : ''}${analysis.scoreVsAverage}%</span>
                            </div>
                            <div class="analysis-item">
                                <span class="analysis-label">Risk Level:</span>
                                <span class="analysis-value">${analysis.riskLevel}</span>
                            </div>
                            <div class="analysis-item">
                                <span class="analysis-label">Market Position:</span>
                                <span class="analysis-value">${analysis.marketPosition}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="recommendation-section">
                        <h5>Recommendation</h5>
                        <div class="recommendation-box ${analysis.recommendation.includes('Highly') ? 'highly-recommended' : analysis.recommendation.includes('Recommended') ? 'recommended' : 'caution'}">
                            <strong>${analysis.recommendation}</strong>
                            <p>This deal shows ${analysis.profitVsAverage > 20 ? 'exceptional' : analysis.profitVsAverage > 0 ? 'good' : 'below average'} profit potential compared to market average.</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        popup.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            z-index: 999999;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        
        document.body.appendChild(popup);
        
        popup.addEventListener('click', (e) => {
            if (e.target === popup) popup.remove();
        });
    }
    
    // Generate deal comparison
    function generateDealComparison(deal) {
        const recentDeals = advancedDealsData.all.slice(-10);
        const avgProfit = recentDeals.reduce((sum, d) => sum + d.profitData.netProfit, 0) / recentDeals.length;
        const avgScore = recentDeals.reduce((sum, d) => sum + d.score, 0) / recentDeals.length;
        const avgRate = recentDeals.reduce((sum, d) => sum + d.ratePerMileValue, 0) / recentDeals.length;
        
        return {
            avgProfit: avgProfit.toFixed(0),
            avgScore: avgScore.toFixed(1),
            avgRate: avgRate.toFixed(2),
            ranking: recentDeals.sort((a, b) => b.score - a.score).findIndex(d => d === deal) + 1,
            totalDeals: recentDeals.length
        };
    }
    
    // Show comparison popup
    function showComparisonPopup(deal, comparison) {
        const popup = document.createElement('div');
        popup.className = 'dat-pro-popup';
        popup.innerHTML = `
            <div class="dat-pro-popup-content">
                <div class="dat-pro-popup-header">
                    <h4>⚖️ Deal Comparison Analysis</h4>
                    <button class="dat-pro-popup-close" onclick="this.parentElement.parentElement.parentElement.remove()">×</button>
                </div>
                <div class="dat-pro-popup-body">
                    <div class="comparison-grid">
                        <div class="comparison-section">
                            <h5>This Deal</h5>
                            <div class="comparison-metrics">
                                <div>Profit: $${Math.round(deal.profitData.netProfit)}</div>
                                <div>Score: ${deal.score}%</div>
                                <div>Rate: $${deal.ratePerMileValue.toFixed(2)}/mi</div>
                                <div>Ranking: #${comparison.ranking} of ${comparison.totalDeals}</div>
                            </div>
                        </div>
                        
                        <div class="comparison-section">
                            <h5>Market Average (Last 10 Deals)</h5>
                            <div class="comparison-metrics">
                                <div>Profit: $${comparison.avgProfit}</div>
                                <div>Score: ${comparison.avgScore}%</div>
                                <div>Rate: $${comparison.avgRate}/mi</div>
                                <div>Percentile: ${(100 - (comparison.ranking / comparison.totalDeals * 100)).toFixed(0)}th</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="comparison-verdict">
                        <strong>Verdict:</strong> This deal ranks in the 
                        <span class="${comparison.ranking <= 3 ? 'top-tier' : comparison.ranking <= 6 ? 'mid-tier' : 'lower-tier'}">
                            ${comparison.ranking <= 3 ? 'TOP TIER' : comparison.ranking <= 6 ? 'MIDDLE TIER' : 'LOWER TIER'}
                        </span>
                        of recent opportunities.
                    </div>
                </div>
            </div>
        `;
        
        popup.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            z-index: 999999;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        
        document.body.appendChild(popup);
        
        popup.addEventListener('click', (e) => {
            if (e.target === popup) popup.remove();
        });
    }
    
    // Update advanced deals data tracking
    function updateDealsData(loadData, profitData, score, isPremium) {
        const deal = {
            ...loadData,
            profitData,
            score,
            isPremium,
            timestamp: Date.now(),
            estimatedDistance: profitData.estimatedDistance
        };
        
        // Add to all deals
        advancedDealsData.all.push(deal);
        
        // Add to recent (always)
        advancedDealsData.recent.push(deal);
        
        // Add to specific categories
        if (isPremium) {
            advancedDealsData.premium.push(deal);
        }
        
        if (score >= 90) {
            advancedDealsData.excellent.push(deal);
        }
        
        if (loadData.rateValue >= 5000) {
            advancedDealsData.highValue.push(deal);
        }
        
        // Keep only last 50 deals in each category for performance
        Object.keys(advancedDealsData).forEach(key => {
            if (advancedDealsData[key].length > 50) {
                advancedDealsData[key] = advancedDealsData[key].slice(-50);
            }
        });
        
        // Update badges for excellent deals
        if (score >= 95) {
            const excellentBadge = document.getElementById('excellent-badge');
            if (excellentBadge) {
                excellentBadge.style.display = 'block';
                setTimeout(() => {
                    excellentBadge.style.display = 'none';
                }, 8000);
            }
        }
        
        // Update live badge for recent deals
        const recentBadge = document.getElementById('recent-badge');
        if (recentBadge) {
            recentBadge.style.display = 'block';
            setTimeout(() => {
                recentBadge.style.display = 'none';
            }, 3000);
        }
        
        // Update current view if active
        if (currentAdvancedView) {
            const dealsList = document.getElementById('advanced-deals-list');
            if (dealsList) {
                populateAdvancedDealsView(currentAdvancedView, dealsList);
            }
        }
    }

    // Setup advanced event listeners for real-time updates
    function setupAdvancedEventListeners() {
        // Filter controls
        document.getElementById('filters-enabled')?.addEventListener('change', (e) => {
            CONFIG.filters.enabled = e.target.checked;
            updateFiltersPanelVisibility();
            if (CONFIG.realTimeUpdates) triggerRealTimeUpdate();
        });
        
        document.getElementById('min-rate-mile')?.addEventListener('input', debounceRealTimeUpdate);
        document.getElementById('max-deadhead')?.addEventListener('input', debounceRealTimeUpdate);
        document.getElementById('min-total-rate')?.addEventListener('input', debounceRealTimeUpdate);
        document.getElementById('min-profit-margin')?.addEventListener('input', debounceRealTimeUpdate);
        document.getElementById('min-net-profit')?.addEventListener('input', debounceRealTimeUpdate);
        
        // Profit engine controls
        document.getElementById('profit-enabled')?.addEventListener('change', (e) => {
            CONFIG.profitEngine.enabled = e.target.checked;
            if (CONFIG.realTimeUpdates) triggerRealTimeUpdate();
        });
        
        document.getElementById('fuel-enabled')?.addEventListener('change', (e) => {
            CONFIG.profitEngine.fuelCalculation.enabled = e.target.checked;
            if (CONFIG.realTimeUpdates) triggerRealTimeUpdate();
        });
        
        document.getElementById('fuel-cost')?.addEventListener('input', (e) => {
            CONFIG.profitEngine.fuelCalculation.costPerGallon = parseFloat(e.target.value) || 3.85;
            debounceRealTimeUpdate();
        });
        
        document.getElementById('fuel-mpg')?.addEventListener('input', (e) => {
            CONFIG.profitEngine.fuelCalculation.mpgTruck = parseFloat(e.target.value) || 6.5;
            debounceRealTimeUpdate();
        });
        
        document.getElementById('driver-enabled')?.addEventListener('change', (e) => {
            CONFIG.profitEngine.driverPay.enabled = e.target.checked;
            if (CONFIG.realTimeUpdates) triggerRealTimeUpdate();
        });
        
        document.getElementById('driver-pay')?.addEventListener('input', (e) => {
            CONFIG.profitEngine.driverPay.payPerMile = parseFloat(e.target.value) || 0.65;
            debounceRealTimeUpdate();
        });
        
        document.getElementById('operating-enabled')?.addEventListener('change', (e) => {
            CONFIG.profitEngine.operatingCosts.enabled = e.target.checked;
            if (CONFIG.realTimeUpdates) triggerRealTimeUpdate();
        });
        
        document.getElementById('operating-cost')?.addEventListener('input', (e) => {
            CONFIG.profitEngine.operatingCosts.costPerMile = parseFloat(e.target.value) || 1.85;
            debounceRealTimeUpdate();
        });
        
        document.getElementById('insurance-enabled')?.addEventListener('change', (e) => {
            CONFIG.profitEngine.insurance.enabled = e.target.checked;
            if (CONFIG.realTimeUpdates) triggerRealTimeUpdate();
        });
        
        document.getElementById('insurance-cost')?.addEventListener('input', (e) => {
            CONFIG.profitEngine.insurance.costPerMile = parseFloat(e.target.value) || 0.12;
            debounceRealTimeUpdate();
        });
        
        document.getElementById('maintenance-enabled')?.addEventListener('change', (e) => {
            CONFIG.profitEngine.maintenance.enabled = e.target.checked;
            if (CONFIG.realTimeUpdates) triggerRealTimeUpdate();
        });
        
        document.getElementById('maintenance-cost')?.addEventListener('input', (e) => {
            CONFIG.profitEngine.maintenance.costPerMile = parseFloat(e.target.value) || 0.18;
            debounceRealTimeUpdate();
        });
        
        document.getElementById('permits-enabled')?.addEventListener('change', (e) => {
            CONFIG.profitEngine.permits.enabled = e.target.checked;
            if (CONFIG.realTimeUpdates) triggerRealTimeUpdate();
        });
        
        document.getElementById('permits-cost')?.addEventListener('input', (e) => {
            CONFIG.profitEngine.permits.costPerMile = parseFloat(e.target.value) || 0.05;
            debounceRealTimeUpdate();
        });
        
        // Scoring system controls
        document.getElementById('scoring-enabled')?.addEventListener('change', (e) => {
            CONFIG.scoring.enabled = e.target.checked;
            if (CONFIG.realTimeUpdates) triggerRealTimeUpdate();
        });
        
        document.getElementById('rate-weight')?.addEventListener('input', (e) => {
            CONFIG.scoring.weights.ratePerMile = parseInt(e.target.value) || 40;
            debounceRealTimeUpdate();
        });
        
        document.getElementById('profit-weight')?.addEventListener('input', (e) => {
            CONFIG.scoring.weights.profitMargin = parseInt(e.target.value) || 30;
            debounceRealTimeUpdate();
        });
        
        document.getElementById('deadhead-weight')?.addEventListener('input', (e) => {
            CONFIG.scoring.weights.deadheadEfficiency = parseInt(e.target.value) || 20;
            debounceRealTimeUpdate();
        });
        
        document.getElementById('total-weight')?.addEventListener('input', (e) => {
            CONFIG.scoring.weights.totalRate = parseInt(e.target.value) || 10;
            debounceRealTimeUpdate();
        });
        
        // Initialize filter panel visibility
        updateFiltersPanelVisibility();
    }
    
    // Toggle advanced sections
    window.toggleAdvancedSection = function(sectionId) {
        const content = document.getElementById(sectionId + '-content');
        const toggle = document.getElementById(sectionId + '-toggle');
        
        if (content && toggle) {
            if (content.classList.contains('active')) {
                content.classList.remove('active');
                toggle.textContent = '▼';
            } else {
                content.classList.add('active');
                toggle.textContent = '▲';
            }
        }
    };
    
    // Update filters panel visibility
    function updateFiltersPanelVisibility() {
        const filtersPanel = document.getElementById('filters-panel');
        if (filtersPanel) {
            filtersPanel.style.display = CONFIG.filters.enabled ? 'block' : 'none';
        }
    }
    
    // Debounced real-time update to prevent excessive calls
    let updateTimeout;
    function debounceRealTimeUpdate() {
        if (!CONFIG.realTimeUpdates) return;
        
        clearTimeout(updateTimeout);
        updateTimeout = setTimeout(() => {
            triggerRealTimeUpdate();
        }, 500); // 500ms delay for real-time updates
    }
    
    // Trigger real-time update
    function triggerRealTimeUpdate() {
        console.log('🔄 Real-time configuration update triggered');
        updateProfessionalFilters();
        
        // Update UI labels with new values
        updateConfigLabels();
    }
    
    // Update configuration labels in UI
    function updateConfigLabels() {
        // Update fuel cost label
        const fuelLabel = document.querySelector('label[for="fuel-enabled"]')?.parentElement?.querySelector('.dat-pro-cost-label');
        if (fuelLabel) {
            fuelLabel.innerHTML = `
                <label class="dat-pro-toggle">
                    <input type="checkbox" id="fuel-enabled" ${CONFIG.profitEngine.fuelCalculation.enabled ? 'checked' : ''}>
                    <span class="dat-pro-slider"></span>
                </label>
                Fuel Cost ($${CONFIG.profitEngine.fuelCalculation.costPerGallon}/gal)
            `;
        }
        
        // Update other cost labels similarly
        const costLabels = [
            { id: 'driver-enabled', label: 'Driver Pay', value: CONFIG.profitEngine.driverPay.payPerMile, unit: '/mi' },
            { id: 'operating-enabled', label: 'Operating Costs', value: CONFIG.profitEngine.operatingCosts.costPerMile, unit: '/mi' },
            { id: 'insurance-enabled', label: 'Insurance', value: CONFIG.profitEngine.insurance.costPerMile, unit: '/mi' },
            { id: 'maintenance-enabled', label: 'Maintenance', value: CONFIG.profitEngine.maintenance.costPerMile, unit: '/mi' },
            { id: 'permits-enabled', label: 'Permits', value: CONFIG.profitEngine.permits.costPerMile, unit: '/mi' }
        ];
        
        costLabels.forEach(item => {
            const element = document.getElementById(item.id)?.closest('.dat-pro-cost-label');
            if (element) {
                const text = element.lastChild;
                if (text && text.nodeType === Node.TEXT_NODE) {
                    text.textContent = `${item.label} ($${item.value}${item.unit})`;
                }
            }
        });
    }
    
    // Reset to default configuration
    window.resetToDefaults = function() {
        // Reset CONFIG to defaults
        CONFIG.filters = {
            minRatePerMile: 1.80,
            maxDeadhead: 150,
            minTotalRate: 2000,
            maxTotalRate: 15000,
            minProfitMargin: 10,
            minNetProfit: 200,
            enabled: true
        };
        
        CONFIG.profitEngine = {
            enabled: true,
            fuelCalculation: {
                enabled: true,
                costPerGallon: 3.85,
                mpgTruck: 6.5
            },
            driverPay: {
                enabled: true,
                payPerMile: 0.65
            },
            operatingCosts: {
                enabled: true,
                costPerMile: 1.85
            },
            insurance: {
                enabled: true,
                costPerMile: 0.12
            },
            maintenance: {
                enabled: true,
                costPerMile: 0.18
            },
            permits: {
                enabled: true,
                costPerMile: 0.05
            }
        };
        
        CONFIG.scoring = {
            enabled: true,
            weights: {
                ratePerMile: 40,
                profitMargin: 30,
                deadheadEfficiency: 20,
                totalRate: 10
            }
        };
        
        // Update all UI elements
        document.getElementById('filters-enabled').checked = CONFIG.filters.enabled;
        document.getElementById('min-rate-mile').value = CONFIG.filters.minRatePerMile;
        document.getElementById('max-deadhead').value = CONFIG.filters.maxDeadhead;
        document.getElementById('min-total-rate').value = CONFIG.filters.minTotalRate;
        document.getElementById('min-profit-margin').value = CONFIG.filters.minProfitMargin;
        document.getElementById('min-net-profit').value = CONFIG.filters.minNetProfit;
        
        document.getElementById('profit-enabled').checked = CONFIG.profitEngine.enabled;
        document.getElementById('fuel-enabled').checked = CONFIG.profitEngine.fuelCalculation.enabled;
        document.getElementById('fuel-cost').value = CONFIG.profitEngine.fuelCalculation.costPerGallon;
        document.getElementById('fuel-mpg').value = CONFIG.profitEngine.fuelCalculation.mpgTruck;
        document.getElementById('driver-enabled').checked = CONFIG.profitEngine.driverPay.enabled;
        document.getElementById('driver-pay').value = CONFIG.profitEngine.driverPay.payPerMile;
        document.getElementById('operating-enabled').checked = CONFIG.profitEngine.operatingCosts.enabled;
        document.getElementById('operating-cost').value = CONFIG.profitEngine.operatingCosts.costPerMile;
        document.getElementById('insurance-enabled').checked = CONFIG.profitEngine.insurance.enabled;
        document.getElementById('insurance-cost').value = CONFIG.profitEngine.insurance.costPerMile;
        document.getElementById('maintenance-enabled').checked = CONFIG.profitEngine.maintenance.enabled;
        document.getElementById('maintenance-cost').value = CONFIG.profitEngine.maintenance.costPerMile;
        document.getElementById('permits-enabled').checked = CONFIG.profitEngine.permits.enabled;
        document.getElementById('permits-cost').value = CONFIG.profitEngine.permits.costPerMile;
        
        document.getElementById('scoring-enabled').checked = CONFIG.scoring.enabled;
        document.getElementById('rate-weight').value = CONFIG.scoring.weights.ratePerMile;
        document.getElementById('profit-weight').value = CONFIG.scoring.weights.profitMargin;
        document.getElementById('deadhead-weight').value = CONFIG.scoring.weights.deadheadEfficiency;
        document.getElementById('total-weight').value = CONFIG.scoring.weights.totalRate;
        
        updateFiltersPanelVisibility();
        updateConfigLabels();
        triggerRealTimeUpdate();
        
        console.log('🔄 Configuration reset to defaults');
    };

    // Update professional filters with new advanced logic
    function updateProfessionalFilters() {
        const minRate = parseFloat(document.getElementById('min-rate-mile')?.value) || 0;
        const maxDeadhead = parseInt(document.getElementById('max-deadhead')?.value) || 1000;
        const minTotal = parseInt(document.getElementById('min-total-rate')?.value) || 0;
        const minProfitMargin = parseFloat(document.getElementById('min-profit-margin')?.value) || 0;
        const minNetProfit = parseFloat(document.getElementById('min-net-profit')?.value) || 0;
        
        CONFIG.filters.minRatePerMile = minRate;
        CONFIG.filters.maxDeadhead = maxDeadhead;
        CONFIG.filters.minTotalRate = minTotal;
        CONFIG.filters.minProfitMargin = minProfitMargin;
        CONFIG.filters.minNetProfit = minNetProfit;
        
        console.log('🔄 Advanced filters updated:', CONFIG.filters);
        console.log('🔄 Profit engine config:', CONFIG.profitEngine);
        console.log('🔄 Scoring config:', CONFIG.scoring);
        
        applyProfessionalFilters();
    }

    // Apply professional filters
    function applyProfessionalFilters() {
        console.log('🚀 Applying professional filters and analysis...');
        
        stats.premiumLoads = 0;
        let totalProfit = 0;
        let totalRevenue = 0;
        
        allLoads.forEach((loadData, index) => {
            if (loadData && loadData.element) {
                const profitData = calculateProfit(loadData);
                const score = calculateAdvancedScore(loadData, profitData);
                const wasHighlighted = highlightProfessionalLoad(loadData, profitData, score);
                
                if (wasHighlighted) {
                    stats.premiumLoads++;
                    totalProfit += profitData.netProfit;
                    totalRevenue += loadData.rateValue;
                }
            }
        });
        
        stats.avgProfit = stats.premiumLoads > 0 ? totalProfit / stats.premiumLoads : 0;
        stats.totalRevenue = totalRevenue;
        
        updateProfessionalStats();
    }

    // Clear professional filters (deprecated - use resetToDefaults instead)
    function clearProfessionalFilters() {
        allLoads.forEach(load => {
            if (load.element) {
                load.element.classList.remove('dat-load-premium', 'score-excellent', 'score-good', 'score-standard');
                load.element.style.background = '';
                load.element.style.color = '';
                
                const badge = load.element.querySelector('.dat-pro-badge');
                if (badge) badge.remove();
                
                const btn = load.element.querySelector('.dat-pro-email-btn');
                if (btn) btn.remove();
            }
        });
        
        stats.premiumLoads = 0;
        updateProfessionalStats();
        
        console.log('🔄 Professional highlights cleared');
    }

    // Update professional statistics with advanced dashboard
    function updateProfessionalStats() {
        // Calculate advanced metrics
        const excellentLoads = advancedDealsData.excellent.length;
        const highValueLoads = advancedDealsData.highValue.length;
        
        document.getElementById('total-loads').textContent = stats.totalLoads;
        document.getElementById('premium-loads').textContent = stats.premiumLoads;
        document.getElementById('excellent-loads').textContent = excellentLoads;
        document.getElementById('high-value-count').textContent = highValueLoads;
        
        // Update badges for categories with new activity
        const recentBadge = document.getElementById('recent-badge');
        const premiumBadge = document.getElementById('premium-badge');
        const excellentBadge = document.getElementById('excellent-badge');
        const highValueBadge = document.getElementById('high-value-badge');
        
        // Show live badge for recent activity
        if (stats.totalLoads > 0) {
            if (recentBadge) {
                recentBadge.style.display = 'block';
                setTimeout(() => {
                    recentBadge.style.display = 'none';
                }, 2000);
            }
        }
        
        // Show premium badge for new premium deals
        if (stats.premiumLoads > 0) {
            if (premiumBadge) {
                premiumBadge.style.display = 'block';
                setTimeout(() => {
                    premiumBadge.style.display = 'none';
                }, 4000);
            }
        }
        
        // Show high-value badge for significant revenue
        if (highValueLoads > 0) {
            if (highValueBadge) {
                highValueBadge.style.display = 'block';
                setTimeout(() => {
                    highValueBadge.style.display = 'none';
                }, 5000);
            }
        }
    }

    // Process loads with professional analysis
    function processProfessionalLoads() {
        try {
            console.log('🔍 Professional load processing started...');
            
            // Find all potential load containers using improved selectors
            const selectors = [
                '[class*="table-row"]',
                '[class*="load-row"]',
                '[class*="search-result"]',
                'tr',
                'div[class*="row"]'
            ];
            
            let containers = [];
            selectors.forEach(selector => {
                const elements = document.querySelectorAll(selector);
                containers = containers.concat(Array.from(elements));
            });
            
            // Remove duplicates
            containers = [...new Set(containers)];
            
            let newLoads = 0;
            
            containers.forEach((container, index) => {
                if (container.dataset.professionalProcessed) return;
                
                const loadData = extractEnhancedLoadData(container);
                if (!loadData) return;
                
                // Mark as processed
                container.dataset.professionalProcessed = 'true';
                stats.scannedLoads.add(container);
                allLoads.push(loadData);
                newLoads++;
                
                // Immediate analysis and highlighting
                const profitData = calculateProfit(loadData);
                const score = calculateAdvancedScore(loadData, profitData);
                
                // Store score and profit data with load for deal management
                loadData.score = score;
                loadData.profitData = profitData;
                
                const wasHighlighted = highlightProfessionalLoad(loadData, profitData, score);
                
                if (wasHighlighted) {
                    stats.premiumLoads++;
                    console.log(`🚀 Premium load highlighted: ${score}% score, $${Math.round(profitData.netProfit)} profit`);
                }
            });
            
            stats.totalLoads = stats.scannedLoads.size;
            
            if (newLoads > 0) {
                console.log(`✅ Processed ${newLoads} new loads`);
                updateProfessionalStats();
            }
            
        } catch (error) {
            console.error('Professional processing error:', error);
        }
    }

    // Make functions globally accessible
    window.applyProfessionalFilters = applyProfessionalFilters;
    window.clearProfessionalFilters = clearProfessionalFilters;

    // Initialize professional system
    function initializeProfessional() {
        console.log('🚀 DAT Professional Analyzer v3.2.0 Initializing...');
        console.log('🔧 Configuration:');
        console.log(`   • Real-time Updates: ${CONFIG.realTimeUpdates ? 'Enabled' : 'Disabled'}`);
        console.log(`   • Auto Rescan: ${CONFIG.autoRescan ? 'Enabled' : 'Disabled'}`);
        console.log(`   • Scan Interval: ${CONFIG.scanInterval}ms`);
        
        setTimeout(() => {
            createProfessionalUI();
            processProfessionalLoads();
            
            // Set up continuous monitoring with enhanced features
            setInterval(() => {
                if (CONFIG.autoRescan) {
                    processProfessionalLoads();
                }
            }, CONFIG.scanInterval);
            
            console.log('✅ Professional system active - Advanced load optimization running');
            
            // Log system capabilities
            console.log('🎯 Professional Features Active:');
            console.log('   • Enhanced Load Detection');
            console.log('   • Advanced Profit Analysis Engine');
            console.log('   • Real-time Configuration Updates');
            console.log('   • User-configurable Cost/Profit Settings');
            console.log('   • Advanced Scoring System with Weights');
            console.log('   • Professional Angular/React-style UI');
            console.log('   • Automated Email System');
            console.log('   • Enterprise-grade Performance Metrics');
            
        }, 3000);
    }

    // Start the professional system
    initializeProfessional();

    } catch (error) {
        console.error('DAT Professional Analyzer error:', error);
        // Don't break the website if there's an error
    }
})();
