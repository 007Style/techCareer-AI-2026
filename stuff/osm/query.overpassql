[out:json][timeout:60];
(
 way["highway"~"^(trunk|primary|secondary|tertiary|unclassified|residential|living_street)$"](44.4621515,-73.0757066,44.502151500000004,-72.95170660000001);
 way["waterway"="river"](44.4621515,-73.0757066,44.502151500000004,-72.95170660000001);
);
out geom tags;