interface Abilities {
	id: number;
	identifier: string;
	generationId: number;
	isMainSeries: boolean;
}

interface AbilityChangelog {
	id: number;
	abilityId: number;
	changedInVersionGroupId: number;
}

interface AbilityChangelogProse {
	abilityChangelogId: number;
	localLanguageId: number;
	effect: string;
}

interface AbilityFlavorText {
	abilityId: number;
	versionGroupId: number;
	languageId: number;
	flavorText: string;
}

interface AbilityNames {
	abilityId: number;
	localLanguageId: number;
	name: string;
}

interface AbilityProse {
	abilityId: number;
	localLanguageId: number;
	shortEffect: string;
	effect: string;
}

interface Berries {
	id: number;
	itemId: number;
	firmnessId: number;
	naturalGiftPower: number;
	naturalGiftTypeId: number;
	size: number;
	maxHarvest: number;
	growthTime: number;
	soilDryness: number;
	smoothness: number;
}

interface BerryFirmness {
	id: number;
	identifier: string;
}

interface BerryFirmnessNames {
	berryFirmnessId: number;
	localLanguageId: number;
	name: string;
}

interface BerryFlavors {
	berryId: number;
	contestTypeId: number;
	flavor: number;
}

interface CharacteristicText {
	characteristicId: number;
	localLanguageId: number;
	message: string;
}

interface Characteristics {
	id: number;
	statId: number;
	geneMod_5: number;
}

interface ConquestEpisodeNames {
	episodeId: number;
	localLanguageId: number;
	name: string;
}

interface ConquestEpisodeWarriors {
	episodeId: number;
	warriorId: number;
}

interface ConquestEpisodes {
	id: number;
	identifier: string;
}

interface ConquestKingdomNames {
	kingdomId: number;
	localLanguageId: number;
	name: string;
}

interface ConquestKingdoms {
	id: number;
	identifier: string;
	typeId: number;
}

interface ConquestMaxLinks {
	warriorRankId: number;
	pokemonSpeciesId: number;
	maxLink: number;
}

interface ConquestMoveData {
	moveId: number;
	power: number;
	accuracy: number;
	effectChance: string;
	effectId: number;
	rangeId: number;
	displacementId: string;
}

interface ConquestMoveDisplacementProse {
	moveDisplacementId: number;
	localLanguageId: number;
	name: string;
	shortEffect: string;
	effect: string;
}

interface ConquestMoveDisplacements {
	id: number;
	identifier: string;
	affectsTarget: number;
}

interface ConquestMoveEffectProse {
	conquestMoveEffectId: number;
	localLanguageId: number;
	shortEffect: string;
	effect: string;
}

interface ConquestMoveEffects {
	id: number;
}

interface ConquestMoveRangeProse {
	conquestMoveRangeId: number;
	localLanguageId: number;
	name: string;
	description: string;
}

interface ConquestMoveRanges {
	id: number;
	identifier: string;
	targets: number;
}

interface ConquestPokemonAbilities {
	pokemonSpeciesId: number;
	slot: number;
	abilityId: number;
}

interface ConquestPokemonEvolution {
	evolvedSpeciesId: number;
	requiredStatId: number;
	minimumStat: number;
	minimumLink: string;
	kingdomId: string;
	warriorGenderId: string;
	itemId: string;
	recruitingKoRequired: number;
}

interface ConquestPokemonMoves {
	pokemonSpeciesId: number;
	moveId: number;
}

interface ConquestPokemonStats {
	pokemonSpeciesId: number;
	conquestStatId: number;
	baseStat: number;
}

interface ConquestStatNames {
	conquestStatId: number;
	localLanguageId: number;
	name: string;
}

interface ConquestStats {
	id: number;
	identifier: string;
	isBase: boolean;
}

interface ConquestTransformationPokemon {
	transformationId: number;
	pokemonSpeciesId: number;
}

interface ConquestTransformationWarriors {
	transformationId: number;
	presentWarriorId: number;
}

interface ConquestWarriorArchetypes {
	id: number;
	identifier: string;
}

interface ConquestWarriorNames {
	warriorId: number;
	localLanguageId: number;
	name: string;
}

interface ConquestWarriorRankStatMap {
	warriorRankId: number;
	warriorStatId: number;
	baseStat: number;
}

interface ConquestWarriorRanks {
	id: number;
	warriorId: number;
	rank: number;
	skillId: number;
}

interface ConquestWarriorSkillNames {
	skillId: number;
	localLanguageId: number;
	name: string;
}

interface ConquestWarriorSkills {
	id: number;
	identifier: string;
}

interface ConquestWarriorSpecialties {
	warriorId: number;
	typeId: number;
	slot: number;
}

interface ConquestWarriorStatNames {
	warriorStatId: number;
	localLanguageId: number;
	name: string;
}

interface ConquestWarriorStats {
	id: number;
	identifier: string;
}

interface ConquestWarriorTransformation {
	transformedWarriorRankId: number;
	isAutomatic: boolean;
	requiredLink: string;
	completedEpisodeId: string;
	currentEpisodeId: string;
	distantWarriorId: string;
	femaleWarlordCount: string;
	pokemonCount: string;
	collectionTypeId: string;
	warriorCount: string;
}

interface ConquestWarriors {
	id: number;
	identifier: string;
	genderId: number;
	archetypeId: string;
}

interface ContestCombos {
	firstMoveId: number;
	secondMoveId: number;
}

interface ContestEffectProse {
	contestEffectId: number;
	localLanguageId: number;
	flavorText: string;
	effect: string;
}

interface ContestEffects {
	id: number;
	appeal: number;
	jam: number;
}

interface ContestTypeNames {
	contestTypeId: number;
	localLanguageId: number;
	name: string;
	flavor: string;
	color: string;
}

interface ContestTypes {
	id: number;
	identifier: string;
}

interface EggGroupProse {
	eggGroupId: number;
	localLanguageId: number;
	name: string;
}

interface EggGroups {
	id: number;
	identifier: string;
}

interface EncounterConditionProse {
	encounterConditionId: number;
	localLanguageId: number;
	name: string;
}

interface EncounterConditionValueMap {
	encounterId: number;
	encounterConditionValueId: number;
}

interface EncounterConditionValueProse {
	encounterConditionValueId: number;
	localLanguageId: number;
	name: string;
}

interface EncounterConditionValues {
	id: number;
	encounterConditionId: number;
	identifier: string;
	isDefault: boolean;
}

interface EncounterConditions {
	id: number;
	identifier: string;
}

interface EncounterMethodProse {
	encounterMethodId: number;
	localLanguageId: number;
	name: string;
}

interface EncounterMethods {
	id: number;
	identifier: string;
	order: number;
}

interface EncounterSlots {
	id: number;
	versionGroupId: number;
	encounterMethodId: number;
	slot: number;
	rarity: number;
}

interface Encounters {
	id: number;
	versionId: number;
	locationAreaId: number;
	encounterSlotId: number;
	pokemonId: number;
	minLevel: number;
	maxLevel: number;
}

interface EvolutionChains {
	id: number;
	babyTriggerItemId: string;
}

interface EvolutionTriggerProse {
	evolutionTriggerId: number;
	localLanguageId: number;
	name: string;
}

interface EvolutionTriggers {
	id: number;
	identifier: string;
}

interface Experience {
	growthRateId: number;
	level: number;
	experience: number;
}

interface Genders {
	id: number;
	identifier: string;
}

interface GenerationNames {
	generationId: number;
	localLanguageId: number;
	name: string;
}

interface Generations {
	id: number;
	mainRegionId: number;
	identifier: string;
}

interface GrowthRateProse {
	growthRateId: number;
	localLanguageId: number;
	name: string;
}

interface GrowthRates {
	id: number;
	identifier: string;
	formula: string;
}

interface ItemCategories {
	id: number;
	pocketId: number;
	identifier: string;
}

interface ItemCategoryProse {
	itemCategoryId: number;
	localLanguageId: number;
	name: string;
}

interface ItemFlagMap {
	itemId: number;
	itemFlagId: number;
}

interface ItemFlagProse {
	itemFlagId: number;
	localLanguageId: number;
	name: string;
	description: string;
}

interface ItemFlags {
	id: number;
	identifier: string;
}

interface ItemFlavorSummaries {
	itemId: string;
}

interface ItemFlavorText {
	itemId: number;
	versionGroupId: number;
	languageId: number;
	flavorText: string;
}

interface ItemFlingEffectProse {
	itemFlingEffectId: number;
	localLanguageId: number;
	effect: string;
}

interface ItemFlingEffects {
	id: number;
	identifier: string;
}

interface ItemGameIndices {
	itemId: number;
	generationId: number;
	gameIndex: number;
}

interface ItemNames {
	itemId: number;
	localLanguageId: number;
	name: string;
}

interface ItemPocketNames {
	itemPocketId: number;
	localLanguageId: number;
	name: string;
}

interface ItemPockets {
	id: number;
	identifier: string;
}

interface ItemProse {
	itemId: number;
	localLanguageId: number;
	shortEffect: string;
	effect: string;
}

interface Items {
	id: number;
	identifier: string;
	categoryId: number;
	cost: number;
	flingPower: string;
	flingEffectId: string;
}

interface LanguageNames {
	languageId: number;
	localLanguageId: number;
	name: string;
}

interface Languages {
	id: number;
	iso639: boolean;
	iso3166: boolean;
	identifier: string;
	official: number;
	order: number;
}

interface LocationAreaEncounterRates {
	locationAreaId: number;
	encounterMethodId: number;
	versionId: number;
	rate: number;
}

interface LocationAreaProse {
	locationAreaId: number;
	localLanguageId: number;
	name: string;
}

interface LocationAreas {
	id: number;
	locationId: number;
	gameIndex: number;
	identifier: string;
}

interface LocationGameIndices {
	locationId: number;
	generationId: number;
	gameIndex: number;
}

interface LocationNames {
	locationId: number;
	localLanguageId: number;
	name: string;
	subtitle: string;
}

interface Locations {
	id: number;
	regionId: number;
	identifier: string;
}

interface Machines {
	machineNumber: number;
	versionGroupId: number;
	itemId: number;
	moveId: number;
}

interface MoveBattleStyleProse {
	moveBattleStyleId: number;
	localLanguageId: number;
	name: string;
}

interface MoveBattleStyles {
	id: number;
	identifier: string;
}

interface MoveChangelog {
	moveId: number;
	changedInVersionGroupId: number;
	typeId: number;
	power: string;
	pp: string;
	accuracy: string;
	priority: string;
	targetId: string;
	effectId: string;
	effectChance: string;
}

interface MoveDamageClassProse {
	moveDamageClassId: number;
	localLanguageId: number;
	name: string;
	description: string;
}

interface MoveDamageClasses {
	id: number;
	identifier: string;
}

interface MoveEffectChangelog {
	id: number;
	effectId: number;
	changedInVersionGroupId: number;
}

interface MoveEffectChangelogProse {
	moveEffectChangelogId: number;
	localLanguageId: number;
	effect: string;
}

interface MoveEffectProse {
	moveEffectId: number;
	localLanguageId: number;
	shortEffect: string;
	effect: string;
}

interface MoveEffects {
	id: number;
}

interface MoveFlagMap {
	moveId: number;
	moveFlagId: number;
}

interface MoveFlagProse {
	moveFlagId: number;
	localLanguageId: number;
	name: string;
	description: string;
}

interface MoveFlags {
	id: number;
	identifier: string;
}

interface MoveFlavorSummaries {
	moveId: string;
}

interface MoveFlavorText {
	moveId: number;
	versionGroupId: number;
	languageId: number;
	flavorText: string;
}

interface MoveMeta {
	moveId: number;
	metaCategoryId: number;
	metaAilmentId: number;
	minHits: string;
	maxHits: string;
	minTurns: string;
	maxTurns: string;
	drain: number;
	healing: number;
	critRate: number;
	ailmentChance: number;
	flinchChance: number;
	statChance: number;
}

interface MoveMetaAilmentNames {
	moveMetaAilmentId: number;
	localLanguageId: number;
	name: string;
}

interface MoveMetaAilments {
	id: number;
	identifier: string;
}

interface MoveMetaCategories {
	id: number;
	identifier: string;
}

interface MoveMetaCategoryProse {
	moveMetaCategoryId: number;
	localLanguageId: number;
	description: string;
}

interface MoveMetaStatChanges {
	moveId: number;
	statId: number;
	change: number;
}

interface MoveNames {
	moveId: number;
	localLanguageId: number;
	name: string;
}

interface MoveTargetProse {
	moveTargetId: number;
	localLanguageId: number;
	name: string;
	description: string;
}

interface MoveTargets {
	id: number;
	identifier: string;
}

interface Moves {
	id: number;
	identifier: string;
	generationId: number;
	typeId: number;
	power: number;
	pp: number;
	accuracy: number;
	priority: number;
	targetId: number;
	damageClassId: number;
	effectId: number;
	effectChance: string;
	contestTypeId: number;
	contestEffectId: number;
	superContestEffectId: number;
}

interface NatureBattleStylePreferences {
	natureId: number;
	moveBattleStyleId: number;
	lowHpPreference: number;
	highHpPreference: number;
}

interface NatureNames {
	natureId: number;
	localLanguageId: number;
	name: string;
}

interface NaturePokeathlonStats {
	natureId: number;
	pokeathlonStatId: number;
	maxChange: number;
}

interface Natures {
	id: number;
	identifier: string;
	decreasedStatId: number;
	increasedStatId: number;
	hatesFlavorId: number;
	likesFlavorId: number;
	gameIndex: number;
}

interface PalPark {
	speciesId: number;
	areaId: number;
	baseScore: number;
	rate: number;
}

interface PalParkAreaNames {
	palParkAreaId: number;
	localLanguageId: number;
	name: string;
}

interface PalParkAreas {
	id: number;
	identifier: string;
}

interface PokeathlonStatNames {
	pokeathlonStatId: number;
	localLanguageId: number;
	name: string;
}

interface PokeathlonStats {
	id: number;
	identifier: string;
}

interface PokedexProse {
	pokedexId: number;
	localLanguageId: number;
	name: string;
	description: string;
}

interface PokedexVersionGroups {
	pokedexId: number;
	versionGroupId: number;
}

interface Pokedexes {
	id: number;
	regionId: string;
	identifier: string;
	isMainSeries: boolean;
}

interface Pokemon {
	id: number;
	identifier: string;
	speciesId: number;
	height: number;
	weight: number;
	baseExperience: number;
	order: number;
	isDefault: boolean;
}

interface PokemonAbilities {
	pokemonId: number;
	abilityId: number;
	isHidden: boolean;
	slot: number;
}

interface PokemonColorNames {
	pokemonColorId: number;
	localLanguageId: number;
	name: string;
}

interface PokemonColors {
	id: number;
	identifier: string;
}

interface PokemonDexNumbers {
	speciesId: number;
	pokedexId: number;
	pokedexNumber: number;
}

interface PokemonEggGroups {
	speciesId: number;
	eggGroupId: number;
}

interface PokemonEvolution {
	id: number;
	evolvedSpeciesId: number;
	evolutionTriggerId: number;
	triggerItemId: string;
	minimumLevel: number;
	genderId: string;
	locationId: string;
	heldItemId: string;
	timeOfDay: string;
	knownMoveId: string;
	knownMoveTypeId: string;
	minimumHappiness: string;
	minimumBeauty: string;
	minimumAffection: string;
	relativePhysicalStats: string;
	partySpeciesId: string;
	partyTypeId: string;
	tradeSpeciesId: string;
	needsOverworldRain: number;
	turnUpsideDown: number;
}

interface PokemonFormGenerations {
	pokemonFormId: number;
	generationId: number;
	gameIndex: number;
}

interface PokemonFormNames {
	pokemonFormId: number;
	localLanguageId: number;
	formName: string;
	pokemonName: string;
}

interface PokemonFormPokeathlonStats {
	pokemonFormId: number;
	pokeathlonStatId: number;
	minimumStat: number;
	baseStat: number;
	maximumStat: number;
}

interface PokemonForms {
	id: number;
	identifier: string;
	formIdentifier: string;
	pokemonId: number;
	introducedInVersionGroupId: number;
	isDefault: boolean;
	isBattleOnly: boolean;
	isMega: boolean;
	formOrder: number;
	order: number;
}

interface PokemonGameIndices {
	pokemonId: number;
	versionId: number;
	gameIndex: number;
}

interface PokemonHabitatNames {
	pokemonHabitatId: number;
	localLanguageId: number;
	name: string;
}

interface PokemonHabitats {
	id: number;
	identifier: string;
}

interface PokemonItems {
	pokemonId: number;
	versionId: number;
	itemId: number;
	rarity: number;
}

interface PokemonMoveMethodProse {
	pokemonMoveMethodId: number;
	localLanguageId: number;
	name: string;
	description: string;
}

interface PokemonMoveMethods {
	id: number;
	identifier: string;
}

interface PokemonMoves {
	pokemonId: number;
	versionGroupId: number;
	moveId: number;
	pokemonMoveMethodId: number;
	level: number;
	order: string;
}

interface PokemonShapeProse {
	pokemonShapeId: number;
	localLanguageId: number;
	name: string;
	awesomeName: string;
	description: string;
}

interface PokemonShapes {
	id: number;
	identifier: string;
}

interface PokemonSpecies {
	id: number;
	identifier: string;
	generationId: number;
	evolvesFromSpeciesId: string;
	evolutionChainId: number;
	colorId: number;
	shapeId: number;
	habitatId: number;
	genderRate: number;
	captureRate: number;
	baseHappiness: number;
	isBaby: boolean;
	hatchCounter: number;
	hasGenderDifferences: number;
	growthRateId: number;
	formsSwitchable: number;
	isLegendary: boolean;
	isMythical: boolean;
	order: number;
	conquestOrder: string;
}

interface PokemonSpeciesFlavorSummaries {
	pokemonSpeciesId: string;
}

interface PokemonSpeciesFlavorText {
	speciesId: number;
	versionId: number;
	languageId: number;
	flavorText: string;
}

interface PokemonSpeciesNames {
	pokemonSpeciesId: number;
	localLanguageId: number;
	name: string;
	genus: string;
}

interface PokemonSpeciesProse {
	pokemonSpeciesId: number;
	localLanguageId: number;
	formDescription: string;
}

interface PokemonStats {
	pokemonId: number;
	statId: number;
	baseStat: number;
	effort: number;
}

interface PokemonTypes {
	pokemonId: number;
	typeId: number;
	slot: number;
}

interface RegionNames {
	regionId: number;
	localLanguageId: number;
	name: string;
}

interface Regions {
	id: number;
	identifier: string;
}

interface StatNames {
	statId: number;
	localLanguageId: number;
	name: string;
}

interface Stats {
	id: number;
	damageClassId: string;
	identifier: string;
	isBattleOnly: boolean;
	gameIndex: number;
}

interface SuperContestCombos {
	firstMoveId: number;
	secondMoveId: number;
}

interface SuperContestEffectProse {
	superContestEffectId: number;
	localLanguageId: number;
	flavorText: string;
}

interface SuperContestEffects {
	id: number;
	appeal: number;
}

interface TypeEfficacy {
	damageTypeId: number;
	targetTypeId: number;
	damageFactor: number;
}

interface TypeGameIndices {
	typeId: number;
	generationId: number;
	gameIndex: number;
}

interface TypeNames {
	typeId: number;
	localLanguageId: number;
	name: string;
}

interface Types {
	id: number;
	identifier: string;
	generationId: number;
	damageClassId: number;
}

interface VersionGroupPokemonMoveMethods {
	versionGroupId: number;
	pokemonMoveMethodId: number;
}

interface VersionGroupRegions {
	versionGroupId: number;
	regionId: number;
}

interface VersionGroups {
	id: number;
	identifier: string;
	generationId: number;
	order: number;
}

interface VersionNames {
	versionId: number;
	localLanguageId: number;
	name: string;
}

interface Versions {
	id: number;
	versionGroupId: number;
	identifier: string;
}