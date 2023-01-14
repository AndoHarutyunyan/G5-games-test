export function verifyImageFormat(string) {
  return /^.*\.(webm|mpg|gif|mp2|mpeg|mpe|mpv|ogg|mp4|m4p|m4v|avi|wmv|mov|qt|flv|swf|)$/.test(
    string
  );
}
