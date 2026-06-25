interface searchBarProps {
    value: string;
    onChange: (value: string) => void;
}

export default function SearchBar ({ value, onChange }: 
    searchBarProps) {
        return (
            <input 
            type="text"
            placeholder="Search movies.."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            style={{
                width: "100%",
                padding: "10px",
                fontSize: "16px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                marginBottom: "20px",

            }}
            />
        )
    }