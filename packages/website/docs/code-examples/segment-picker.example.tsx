function Page() {
  const [pokemon, setPokemon] = useState('Bulbasaur');

  return (
    <SegmentPicker
      value={pokemon}
      onChange={setPokemon}
      items={['Bulbasaur', 'Charmander', 'Squirtle']}
    />
  );
}
