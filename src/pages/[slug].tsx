const CollectionPage = ()=>{

<select name="collection">
  {collections.map(collection => (
    <option value={collection.id}>{collection.name}</option>
  ))}
</select>

}

export default CollectionPage