Tag field names with `@JsonProperty('Forename')`
```javascript
export class Model {
  @JsonProperty('Forename')
  FirstName: string;
}
```

Invoke the serialize method `JSON.jsonfy(model);`
```javascript
const model = new Model();
model.FirstName = "Bob";
JSON.jsonfy(model);
```

Result
```json
{"Forename": "bob"}
```

