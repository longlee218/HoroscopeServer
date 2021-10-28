class HoroExplainSchema extends IOttomanType {
    props = ["reason", "result", "refer"];
    constructor(name) {
      super(name, "HoroExplain");
    }
    cast(value) {
      return typeof value !== "object"
        ? checkCastStrategy(value, CAST_STRATEGY.THROW, this)
        : value;
    }
    validate(value) {
      if (!this.hasSameProp(value)) {
        throw new ValidationError(`HoroExplainSchema: Missing prop`);
      }
      this.props.forEach((prop) => {
        if (isNaN(value.prop)) {
          throw new ValidationError(
            `HoroExplainSchema: Prop ${prop} is not a number`
          );
        }
      });
      return value;
    }
    hasSameProp(value) {
      return this.props.every((prop) => {
        return value.hasOwnProperty(prop);
      });
    }
  }

  // Register custom schema
registerType(HoroExplainSchema.name, (obj) => new CoreHoroExplain(obj));