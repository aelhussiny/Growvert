window.config = {
    baseSceneId: "408caca5bb38452181985cd0862e5ac8",
    newGrowMapId: "3010e0da3185428093bf477da08b5b88",
    growsLayer: {
        url:
            "https://services2.arcgis.com/hUPR9iC6qnMcwWsa/arcgis/rest/services/grow_polygons/FeatureServer/0",
        creatorField: "creator_id",
    },
    updates: {
        survey:
            "https://survey123.arcgis.com/share/4648f1930203482787194b40e5188a65?field:grow_id={growid}&hide=navbar,field:submission_date,field:submission_time,field:grow_id",
        url:
            "https://services2.arcgis.com/hUPR9iC6qnMcwWsa/arcgis/rest/services/survey123_4648f1930203482787194b40e5188a65/FeatureServer/0",
    },
    roofLayer: {
        url: "https://services.arcgis.com/at3rDjch5X7i9Bag/arcgis/rest/services/Buildings_NYC/FeatureServer/1",
        heightField: "heightroof",
    },
    solarLayer: {
        url:
            "https://earthobs3.arcgis.com/arcgis/rest/services/GlobalSolarAtlas/ImageServer",
        cutoffs: {
            medium: 1550,
            high: 2000,
        },
    },
    tempLayer: {
        url:
            "https://services2.arcgis.com/hUPR9iC6qnMcwWsa/ArcGIS/rest/services/US_States_Historical_Climate/FeatureServer/0",
        fields: [
            "Mean_T_f_01_Jan",
            "Mean_T_f_02_Feb",
            "Mean_T_f_03_Mar",
            "Mean_T_f_04_Apr",
            "Mean_T_f_05_May",
            "Mean_T_f_06_Jun",
            "Mean_T_f_07_Jul",
            "Mean_T_f_08_Aug",
            "Mean_T_f_09_Sep",
            "Mean_T_f_10_Oct",
            "Mean_T_f_11_Nov",
            "Mean_T_f_12_Dec",
        ],
    },
    plantLayer: {
        url:
            "https://services2.arcgis.com/hUPR9iC6qnMcwWsa/arcgis/rest/services/vegetable_data_v03/FeatureServer/0",
    },
};
