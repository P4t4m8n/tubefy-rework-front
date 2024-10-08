#[wasm_bindgen]
pub fn get_dominant_color(image_data: &[u8]) -> String {
    let mut color_map: HashMap<String, u32> = HashMap::new();
    for i in (0..image_data.len()).step_by(40) {
        let rgb = format!(
            "{},{},{}",
            image_data[i],
            image_data[i + 1],
            image_data[i + 2]
        );
        *color_map.entry(rgb).or_insert(0) += 1;
    }

    let mut sorted_colors: Vec<_> = color_map.iter().collect();
    sorted_colors.sort_by(|a, b| b.1.cmp(a.1));

    let top_colors: Vec<String> = sorted_colors
        .iter()
        .take(3)
        .map(|(color, _)| format!("rgb({})", color))
        .collect();
    top_colors.push("rgb(18, 18, 18)".to_string());
    format!("linear-gradient(to bottom, {})", top_colors.join(", "))
}
