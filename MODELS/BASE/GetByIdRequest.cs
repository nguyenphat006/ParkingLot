using FluentValidation;

namespace MODELS
{
    public class GetByIdRequest
    {
        public Guid? Id { get; set; }
        
    }

    public class GetByIdDeleteRequestValidator : AbstractValidator<GetByIdRequest>
    {
        public GetByIdDeleteRequestValidator()
        {
            RuleFor(r => r.Id).NotNull().WithMessage("Mã không được rỗng");
        }
    }
}
