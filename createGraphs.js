let comgraph = require("@arangodb/general-graph");
let graph = require("@arangodb/smart-graph");
let randomConfig = [
  graph._relation("relations_random", "profiles_random", "profiles_random")
];
let smartConfig = [
  graph._relation("relations_smart", "profiles_smart", "profiles_smart")
];

let numberOfShards = 9;

// Create Random Graph
comgraph._create("pokec_random", randomConfig, [], {numberOfShards});

// Create SmartGraph
graph._create("pokec_smart", smartConfig, [], {numberOfShards, smartGraphAttribute: "region"});
