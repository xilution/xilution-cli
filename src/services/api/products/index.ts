import basics from "./basics";
import contentDelivery from "./content-delivery";
import core from "./core";
import integration from "./integration";

export default {
  productCategories: {
    basics,
    "content-delivery": contentDelivery,
    core,
    integration,
  },
};
